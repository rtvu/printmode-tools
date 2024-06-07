import { describe, expect, test } from "vitest";

import {
  assertIsFormattedHexColor,
  assertIsHexColor,
  assertIsUnformattedHexColor,
  isFormattedHexColor,
  isHexColor,
  isUnformattedHexColor,
  toFormattedHexColor,
} from "../../common/HexColor";

import { getRunAssertIs } from "../../common/vitestUtilities";

describe("FormattedHexColor", () => {
  const runAssertIsFormattedHexColor = (color: string) => getRunAssertIs(assertIsFormattedHexColor, color);

  test("valid inputs", () => {
    expect(toFormattedHexColor("#abcdef")).toBe("#abcdef");
    expect(toFormattedHexColor("#012345")).toBe("#012345");
    expect(toFormattedHexColor("#678")).toBe("#667788");
    expect(toFormattedHexColor("999999")).toBe("#999999");
    expect(toFormattedHexColor("FFF")).toBe("#ffffff");

    expect(isFormattedHexColor("#abcdef")).toBe(true);
    expect(isFormattedHexColor("#012345")).toBe(true);
    expect(isFormattedHexColor("#678999")).toBe(true);

    expect(runAssertIsFormattedHexColor("#abcdef")).not.toThrowError();
    expect(runAssertIsFormattedHexColor("#012345")).not.toThrowError();
    expect(runAssertIsFormattedHexColor("#678999")).not.toThrowError();
  });

  test("invalid inputs", () => {
    expect(toFormattedHexColor("#zzzzzz")).toBe(null);
    expect(toFormattedHexColor("#zzz")).toBe(null);
    expect(toFormattedHexColor("zzzzzz")).toBe(null);
    expect(toFormattedHexColor("zzz")).toBe(null);
    expect(toFormattedHexColor("")).toBe(null);
    expect(toFormattedHexColor("0")).toBe(null);
    expect(toFormattedHexColor("00")).toBe(null);
    expect(toFormattedHexColor("0000")).toBe(null);
    expect(toFormattedHexColor("00000")).toBe(null);
    expect(toFormattedHexColor("0000000")).toBe(null);

    expect(isFormattedHexColor("#zzzzzz")).toBe(false);
    expect(isFormattedHexColor("#zzz")).toBe(false);
    expect(isFormattedHexColor("zzzzzz")).toBe(false);
    expect(isFormattedHexColor("zzz")).toBe(false);
    expect(isFormattedHexColor("")).toBe(false);
    expect(isFormattedHexColor("0")).toBe(false);
    expect(isFormattedHexColor("00")).toBe(false);
    expect(isFormattedHexColor("0000")).toBe(false);
    expect(isFormattedHexColor("00000")).toBe(false);
    expect(isFormattedHexColor("0000000")).toBe(false);

    expect(runAssertIsFormattedHexColor("#abcdeF")).toThrowError();
    expect(runAssertIsFormattedHexColor("#01234F")).toThrowError();
    expect(runAssertIsFormattedHexColor("abcdeF")).toThrowError();
    expect(runAssertIsFormattedHexColor("01234F")).toThrowError();
    expect(runAssertIsFormattedHexColor("#zzzzzz")).toThrowError();
    expect(runAssertIsFormattedHexColor("#zzz")).toThrowError();
    expect(runAssertIsFormattedHexColor("zzzzzz")).toThrowError();
    expect(runAssertIsFormattedHexColor("zzz")).toThrowError();
    expect(runAssertIsFormattedHexColor("")).toThrowError();
    expect(runAssertIsFormattedHexColor("0")).toThrowError();
    expect(runAssertIsFormattedHexColor("00")).toThrowError();
    expect(runAssertIsFormattedHexColor("0000")).toThrowError();
    expect(runAssertIsFormattedHexColor("00000")).toThrowError();
    expect(runAssertIsFormattedHexColor("0000000")).toThrowError();
  });
});

describe("UnformattedHexColor", () => {
  const runAssertIsUnformattedHexColor = (color: string) => getRunAssertIs(assertIsUnformattedHexColor, color);

  test("valid inputs", () => {
    expect(isUnformattedHexColor("#abcdeF")).toBe(true);
    expect(isUnformattedHexColor("#01234F")).toBe(true);
    expect(isUnformattedHexColor("abcdeF")).toBe(true);
    expect(isUnformattedHexColor("01234F")).toBe(true);

    expect(runAssertIsUnformattedHexColor("#abcdeF")).not.toThrowError();
    expect(runAssertIsUnformattedHexColor("#01234F")).not.toThrowError();
    expect(runAssertIsUnformattedHexColor("abcdeF")).not.toThrowError();
    expect(runAssertIsUnformattedHexColor("01234F")).not.toThrowError();
  });

  test("invalid inputs", () => {
    expect(isUnformattedHexColor("#abcdef")).toBe(false);
    expect(isUnformattedHexColor("#012345")).toBe(false);
    expect(isUnformattedHexColor("#678999")).toBe(false);
    expect(isUnformattedHexColor("#zzzzzz")).toBe(false);
    expect(isUnformattedHexColor("#zzz")).toBe(false);
    expect(isUnformattedHexColor("zzzzzz")).toBe(false);
    expect(isUnformattedHexColor("zzz")).toBe(false);
    expect(isUnformattedHexColor("")).toBe(false);
    expect(isUnformattedHexColor("0")).toBe(false);
    expect(isUnformattedHexColor("00")).toBe(false);
    expect(isUnformattedHexColor("0000")).toBe(false);
    expect(isUnformattedHexColor("00000")).toBe(false);
    expect(isUnformattedHexColor("0000000")).toBe(false);

    expect(runAssertIsUnformattedHexColor("#abcdef")).toThrowError();
    expect(runAssertIsUnformattedHexColor("#012345")).toThrowError();
    expect(runAssertIsUnformattedHexColor("#678999")).toThrowError();
    expect(runAssertIsUnformattedHexColor("#zzzzzz")).toThrowError();
    expect(runAssertIsUnformattedHexColor("#zzz")).toThrowError();
    expect(runAssertIsUnformattedHexColor("zzzzzz")).toThrowError();
    expect(runAssertIsUnformattedHexColor("zzz")).toThrowError();
    expect(runAssertIsUnformattedHexColor("")).toThrowError();
    expect(runAssertIsUnformattedHexColor("0")).toThrowError();
    expect(runAssertIsUnformattedHexColor("00")).toThrowError();
    expect(runAssertIsUnformattedHexColor("0000")).toThrowError();
    expect(runAssertIsUnformattedHexColor("00000")).toThrowError();
    expect(runAssertIsUnformattedHexColor("0000000")).toThrowError();
  });
});

describe("HexColor", () => {
  const runAssertIsHexColor = (color: string) => getRunAssertIs(assertIsHexColor, color);

  test("valid inputs", () => {
    expect(isHexColor("#abcdef")).toBe(true);
    expect(isHexColor("#012345")).toBe(true);
    expect(isHexColor("#678999")).toBe(true);
    expect(isHexColor("#abcdeF")).toBe(true);
    expect(isHexColor("#01234F")).toBe(true);
    expect(isHexColor("abcdeF")).toBe(true);
    expect(isHexColor("01234F")).toBe(true);

    expect(runAssertIsHexColor("#abcdef")).not.toThrowError();
    expect(runAssertIsHexColor("#012345")).not.toThrowError();
    expect(runAssertIsHexColor("#678999")).not.toThrowError();
    expect(runAssertIsHexColor("#abcdeF")).not.toThrowError();
    expect(runAssertIsHexColor("#01234F")).not.toThrowError();
    expect(runAssertIsHexColor("abcdeF")).not.toThrowError();
    expect(runAssertIsHexColor("01234F")).not.toThrowError();
  });

  test("invalid inputs", () => {
    expect(isHexColor("#zzzzzz")).toBe(false);
    expect(isHexColor("#zzz")).toBe(false);
    expect(isHexColor("zzzzzz")).toBe(false);
    expect(isHexColor("zzz")).toBe(false);
    expect(isHexColor("")).toBe(false);
    expect(isHexColor("0")).toBe(false);
    expect(isHexColor("00")).toBe(false);
    expect(isHexColor("0000")).toBe(false);
    expect(isHexColor("00000")).toBe(false);
    expect(isHexColor("0000000")).toBe(false);

    expect(runAssertIsHexColor("#zzzzzz")).toThrowError();
    expect(runAssertIsHexColor("#zzz")).toThrowError();
    expect(runAssertIsHexColor("zzzzzz")).toThrowError();
    expect(runAssertIsHexColor("zzz")).toThrowError();
    expect(runAssertIsHexColor("")).toThrowError();
    expect(runAssertIsHexColor("0")).toThrowError();
    expect(runAssertIsHexColor("00")).toThrowError();
    expect(runAssertIsHexColor("0000")).toThrowError();
    expect(runAssertIsHexColor("00000")).toThrowError();
    expect(runAssertIsHexColor("0000000")).toThrowError();
  });
});
