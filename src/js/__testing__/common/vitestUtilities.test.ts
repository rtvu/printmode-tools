import { describe, expect, test } from "vitest";

import { getRunAssertIs, setNot } from "../../common/vitestUtilities";

describe("setNot", () => {
  test("not is toggled", () => {
    setNot(expect(0), false).toBe(0);
    setNot(expect(0), true).toBe(1);
  });
});

describe("getRunAssertIs", () => {
  test("runs assertIs", () => {
    const assertIsNumber = (value: unknown): asserts value is number => {
      if (typeof value !== "number") {
        throw new TypeError();
      }
    };

    const runAssertIsNumber = (value: unknown) => getRunAssertIs(assertIsNumber, value);

    expect(runAssertIsNumber(5)).not.toThrowError();
    expect(runAssertIsNumber("")).toThrowError();
  });
});
