import { reduceNullables } from "./utilities";

export type FormattedHexColor = string & { readonly FormattedHexColor: unique symbol };
export type UnformattedHexColor = string & { readonly UnformattedHexColor: unique symbol };
export type HexColor = UnformattedHexColor | FormattedHexColor;

function concatenate(x: string, y: string): string {
  return x + y;
}

export function toFormattedHexColor(color: string): FormattedHexColor | null {
  color = color.trim().toLowerCase();

  let results: RegExpExecArray | null;

  results = /^#?([0-9a-f]{1})([0-9a-f]{1})([0-9a-f]{1})$/i.exec(color);
  if (results !== null) {
    const hexColor = reduceNullables(
      ["#", results[1], results[1], results[2], results[2], results[3], results[3]],
      concatenate,
      "",
    );
    if (hexColor !== null) {
      return hexColor as FormattedHexColor;
    }
  }

  results = /^#?([0-9a-f]{6})$/i.exec(color);
  if (results !== null) {
    const hexColor = reduceNullables(["#", results[1]], concatenate, "");
    if (hexColor !== null) {
      return hexColor as FormattedHexColor;
    }
  }

  return null;
}

export function isFormattedHexColor(color: string): color is FormattedHexColor {
  return toFormattedHexColor(color) === color;
}

export function isHexColor(color: string): color is HexColor {
  const trimmedColor = color.trim();

  return (
    /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/i.exec(trimmedColor) !== null ||
    /^#?([0-9a-fA-F]{6})$/i.exec(trimmedColor) !== null
  );
}

export function isUnformattedHexColor(color: string): color is UnformattedHexColor {
  return isHexColor(color) && !isFormattedHexColor(color);
}

export function assertIsFormattedHexColor(color: string): asserts color is FormattedHexColor {
  if (!isFormattedHexColor(color)) {
    throw new TypeError(`String "${color}" is not a FormattedHexColor.`);
  }
}

export function assertIsUnformattedHexColor(color: string): asserts color is UnformattedHexColor {
  if (!isUnformattedHexColor(color)) {
    throw new TypeError(`String "${color}" is not an UnformattedHexColor.`);
  }
}

export function assertIsHexColor(color: string): asserts color is HexColor {
  if (!isHexColor(color)) {
    throw new TypeError(`String "${color}" is not a HexColor.`);
  }
}
