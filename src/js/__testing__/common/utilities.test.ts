import { describe, expect, test } from "vitest";

import { reduceNullables } from "../../common/utilities";

describe("reduceNullables", () => {
  const concatenate = (x: string, y: string) => x + y;

  test("array of strings returns a string", () => {
    const array = ["s", "t", "r", "i", "n", "g"];
    expect(reduceNullables(array, concatenate, "")).toBe(array.join(""));
  });

  test("array of nulls returns a null", () => {
    const array = [null, null, null];
    expect(reduceNullables(array, concatenate, "")).toBe(null);
  });

  test("array of undefineds returns a null", () => {
    const array = [undefined, undefined, undefined];
    expect(reduceNullables(array, concatenate, "")).toBe(null);
  });

  test("array of strings, nulls, undefineds returns a null", () => {
    const array = ["s", null, "t", undefined, "r", null, "i", undefined, "n", null, "g"];
    expect(reduceNullables(array, concatenate, "")).toBe(null);
  });
});
