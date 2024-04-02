import { toTitleCase } from "./strings";

describe("toTitleCase", () => {
  it("should titlecase", () => {
    expect(toTitleCase("this is a test")).toBe("This Is A Test");
    expect(toTitleCase("hello world")).toBe("Hello World");
    expect(toTitleCase("a single word")).toBe("A Single Word");
  });

  it("should only touch the first letter of each word segment", () => {
    expect(toTitleCase("hello-world")).toBe("Hello-world");
    expect(toTitleCase("some_thing")).toBe("Some_thing");
    expect(toTitleCase("this-is-a-test")).toBe("This-is-a-test");
  });
});
