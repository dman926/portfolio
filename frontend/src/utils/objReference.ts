export const deepEqual = <T>(obj1: T, obj2: T): boolean => {
  // Check if the objects are strictly equal
  if (obj1 === obj2) {
    return true;
  }

  // Check if both objects are objects and not null
  if (
    typeof obj1 !== "object" ||
    obj1 === null ||
    typeof obj2 !== "object" ||
    obj2 === null
  ) {
    return false;
  }

  // Get the keys of both objects
  const keys1 = Object.keys(obj1) as (keyof T)[];
  const keys2 = Object.keys(obj2) as (keyof T)[];

  // Check if the number of keys is the same
  if (keys1.length !== keys2.length) {
    return false;
  }

  // Recursively compare the values of each key
  for (const key of keys1) {
    if (!deepEqual(obj1[key], obj2[key])) {
      return false;
    }
  }

  // All values are deeply equal
  return true;
};

export const deepCopy = <T>(obj: T): T => {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => deepCopy(item)) as unknown as T;
  }

  const copiedObj: Partial<T> = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      copiedObj[key] = deepCopy(obj[key]);
    }
  }

  return copiedObj as T;
};
