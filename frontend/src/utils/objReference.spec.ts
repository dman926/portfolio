import { deepEqual, deepCopy } from "./objReference";

describe("deepEqual", () => {
  it("should return true for deeply equal objects", () => {
    const obj1 = { a: 1, b: { c: 2 }, d: [{ e: 3 }, { f: { g: 4 } }] };
    const obj2 = { a: 1, b: { c: 2 }, d: [{ e: 3 }, { f: { g: 4 } }] };

    expect(deepEqual(obj1, obj2)).toBe(true);
  });

  it("should return false for not deeply equal objects", () => {
    const obj1 = { a: 1, b: { c: 2 }, d: [{ e: 3 }, { f: { g: 4 } }] };
    const obj2 = { a: 1, b: { c: 2 }, d: [{ e: 3 }, { f: { g: 5 } }] };

    expect(deepEqual(obj1, obj2)).toBe(false);
  });
});

describe("deepCopy", () => {
  it("should create a deep copy of the object", () => {
    const obj = { a: 1, b: { c: 2 } };
    const copiedObj = deepCopy(obj);

    // Check if the copied object is deeply equal to the original object
    expect(deepEqual(obj, copiedObj)).toBe(true);

    // Check if the copied object is not the same reference as the original object
    expect(obj === copiedObj).toBe(false);
  });
});
