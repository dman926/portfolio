import { deepCopy } from "./objReference";

export const toTitleCase = (str: string) => {
  return str.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
  });
};

export const prependString = <T>(prefix: string, obj: T): T => {
  // Helper function to handle nested objects
  function processObject(innerObj: any) {
    if (typeof innerObj === "string") {
      return prefix + innerObj;
    } else if (typeof innerObj === "object" && innerObj !== null) {
      // Recursively process nested objects
      for (const key in innerObj) {
        innerObj[key] = processObject(innerObj[key]);
      }
      return innerObj;
    } else {
      return innerObj;
    }
  }

  return processObject(deepCopy(obj));
};
