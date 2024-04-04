const baseColors = {
  inherit: "inherit",
  transparent: "transparent",
  current: "currentColor",
};

const colors = {
  ...baseColors,
  base00: "hsl(var(--color-base00) / <alpha-value>)",
  base01: "hsl(var(--color-base01) / <alpha-value>)",
  base02: "hsl(var(--color-base02) / <alpha-value>)",
  base03: "hsl(var(--color-base03) / <alpha-value>)",
  base04: "hsl(var(--color-base04) / <alpha-value>)",
  base05: "hsl(var(--color-base05) / <alpha-value>)",
  base06: "hsl(var(--color-base06) / <alpha-value>)",
  base07: "hsl(var(--color-base07) / <alpha-value>)",
  base08: "hsl(var(--color-base08) / <alpha-value>)",
  base09: "hsl(var(--color-base09) / <alpha-value>)",
  base0A: "hsl(var(--color-base0A) / <alpha-value>)",
  base0B: "hsl(var(--color-base0B) / <alpha-value>)",
  base0C: "hsl(var(--color-base0C) / <alpha-value>)",
  base0D: "hsl(var(--color-base0D) / <alpha-value>)",
  base0E: "hsl(var(--color-base0E) / <alpha-value>)",
  base0F: "hsl(var(--color-base0F) / <alpha-value>)",
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    colors,
    textColor: {
      ...baseColors,
      DEFAULT: colors.base05,
      primary: colors.base0D,
      secondary: colors.base0E,
      muted: colors.base03,
    },
    backgroundColor: {
      ...baseColors,
      DEFAULT: colors.base00,
      secondary: colors.base01,
      highlight: colors.base02,
    },
    divideColor: {
      ...baseColors,
      DEFAULT: colors.base03,
    },
    borderColor: {
      ...baseColors,
      DEFAULT: colors.base03,
      highlight: colors.base0B,
    },
    extend: {
      keyframes: {
        "gradient-fancy": {
          "0%, 100%": {
            "background-position": "0% 50%",
            "background-size": "200% 200%",
          },
          "50%": {
            "background-position": "100% 50%",
            "background-size": "300% 300%",
          },
          "25%": {
            "background-position": "50% 100%",
            "background-size": "400% 400%",
          },
          "75%": {
            "background-position": "50% 0%",
            "background-size": "500% 500%",
          },
        },
        "bounce-inverted": {
          "0%, 100%": {
            transform: "translateY(0)",
            "animation-timing-function": "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateY(-25%)",
            "animation-timing-function": "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
      },
      animation: {
        "gradient-fancy": "gradient-fancy 15s ease infinite",
        "bounce-inverted": "bounce-inverted 1s infinite",
      },
    },
  },
  plugins: [],
};
