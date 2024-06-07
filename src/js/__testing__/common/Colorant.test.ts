import { describe, expect, test } from "vitest";

import { isColorant, assertIsColorant } from "../../common/Colorant";

import { getRunAssertIs } from "../../common/vitestUtilities";

describe("Colorant", () => {
  const runAssertIsColorant = (colorant: string) => getRunAssertIs(assertIsColorant, colorant);

  test("valid inputs", () => {
    expect(isColorant("W")).toBe(true);
    expect(isColorant("w")).toBe(true);
    expect(isColorant("W0")).toBe(true);
    expect(isColorant("w0")).toBe(true);
    expect(isColorant("Wh0")).toBe(true);

    expect(runAssertIsColorant("W")).not.toThrowError();
    expect(runAssertIsColorant("w")).not.toThrowError();
    expect(runAssertIsColorant("W0")).not.toThrowError();
  });

  test("invalid inputs", () => {
    expect(isColorant("1W")).toBe(false);
    expect(isColorant("w#")).toBe(false);

    expect(runAssertIsColorant("1W")).toThrowError();
    expect(runAssertIsColorant("w#")).toThrowError();
  });
});
