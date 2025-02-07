export type HexColor = string & { readonly HexColor: unique symbol };

export function toHexColor(color: string): HexColor | null {
  color = color.trim().toLowerCase();

  let results: RegExpExecArray | null;

  results = /^#?([0-9a-f]{1})([0-9a-f]{1})([0-9a-f]{1})$/i.exec(color);
  if (results !== null) {
    return ("#" + results[1] + results[1] + results[2] + results[2] + results[3] + results[3]) as HexColor;
  }

  results = /^#?([0-9a-f]{6})$/i.exec(color);
  if (results !== null) {
    return ("#" + results[1]) as HexColor;
  }

  return null;
}

export function isHexColor(color: string): color is HexColor {
  if (toHexColor(color) !== null) {
    return true;
  } else {
    return false;
  }
}

export function assertIsHexColor(color: string): asserts color is HexColor {
  if (!isHexColor(color)) {
    throw new TypeError(`String "${color}" is not a HexColor.`);
  }
}
