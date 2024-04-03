import { createInterface } from "readline";
import { parse } from "yaml";
import chalk from "chalk";

const exitCodes = ["q", ":q", "exit"];
const reader = createInterface({
  input: process.stdin,
  output: process.stdout,
});
const question = (str: string) =>
  new Promise<string>((resolve) => reader.question(str, resolve));

const getSchemeUrl = (schemeName: string) =>
  `https://raw.githubusercontent.com/tinted-theming/schemes/spec-0.11/base16/${schemeName}.yaml`;

const hexToHSL = (H: string) => {
  // Convert hex to RGB first
  let r = 0,
    g = 0,
    b = 0;
  if (H.length == 4) {
    r = Number("0x" + H[1] + H[1]);
    g = Number("0x" + H[2] + H[2]);
    b = Number("0x" + H[3] + H[3]);
  } else if (H.length == 7) {
    r = Number("0x" + H[1] + H[2]);
    g = Number("0x" + H[3] + H[4]);
    b = Number("0x" + H[5] + H[6]);
  }
  // Then to HSL
  r /= 255;
  g /= 255;
  b /= 255;
  let cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0;

  if (delta == 0) h = 0;
  else if (cmax == r) h = ((g - b) / delta) % 6;
  else if (cmax == g) h = (b - r) / delta + 2;
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  if (h < 0) h += 360;

  l = (cmax + cmin) / 2;
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return `${Math.round(h)}deg ${Math.round(s)}% ${Math.round(l)}%`;
};

const steps = {
  start: async () => {
    console.log(chalk.white.bold(`Exit with [ ${exitCodes.join(" | ")} ]`));
    return steps.showPrompt();
  },
  showPrompt: async () => {
    const schemeName = await question(chalk.white("Scheme name: "));
    if (!exitCodes.includes(schemeName)) {
      return steps.convert(schemeName);
    }
    console.log("Goodbye");
    return steps.end();
  },
  convert: async (schemeName: string) => {
    const { palette } = await fetch(getSchemeUrl(schemeName))
      .then((response) => response.text())
      .then((yaml) => parse(yaml))
      .catch((err) => {
        console.error(`Scheme ${schemeName} not found`);
      });
    if (!palette) {
      console.error(`Scheme ${schemeName} not found`);
      return steps.showPrompt();
    }
    Object.entries(palette).forEach(([key, value]) => {
      console.log(`${key}: ${hexToHSL(`#${value}`)}`);
    });
    return steps.showPrompt();
  },
  end: async () => {
    reader.close();
  },
};

steps.start();
