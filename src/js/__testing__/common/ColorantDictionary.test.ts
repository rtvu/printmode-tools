import { describe, expect, test } from "vitest";

import { OrderedSet } from "immutable";

import { Colorant } from "../../common/Colorant";
import { HexColor } from "../../common/HexColor";
import {
  ColorToColorants,
  ColorantToColor,
  getNewColorToColorants,
  getNewColorantToColor,
  invertColorToColorants,
  invertColorantToColor,
  mergeColorToColorants,
  mergeColorantToColor,
} from "../../common/ColorantDictionary";

describe("ColorToColorants", () => {
  const seed = [
    ["#ffffff", ["W", "w"]],
    ["#000000", ["K", "k"]],
  ] as [HexColor, Colorant[]][];

  test("getNewColorToColorants", () => {
    let colorToColorants: ColorToColorants;

    colorToColorants = getNewColorToColorants();
    for (const [color, colorants] of seed) {
      colorToColorants = colorToColorants.set(color, OrderedSet(colorants));
    }
    for (const [color, colorants] of seed) {
      expect(colorToColorants.get(color, OrderedSet()).toArray()).toEqual(colorants);
    }

    colorToColorants = getNewColorToColorants(seed);
    for (const [color, colorants] of seed) {
      expect(colorToColorants.get(color, OrderedSet()).toArray()).toEqual(colorants);
    }

    const newSeed: [HexColor, OrderedSet<Colorant>][] = seed.map(([color, colorant]) => [color, OrderedSet(colorant)]);
    colorToColorants = getNewColorToColorants(newSeed);
    for (const [color, colorants] of seed) {
      expect(colorToColorants.get(color, OrderedSet()).toArray()).toEqual(colorants);
    }
  });

  test("invertColorToColorants", () => {
    const colorToColorants = getNewColorToColorants(seed);
    const colorantToColor = invertColorToColorants(colorToColorants);
    for (const [color, colorants] of seed) {
      for (const colorant of colorants) {
        expect(colorantToColor.get(colorant)).toBe(color);
      }
    }
  });

  test("mergeColorToColorants", () => {
    const updateSeed = [
      ["#ffffff", ["w1"]],
      ["#000000", ["k1"]],
      ["#eeeeee", ["W", "w"]],
    ] as [HexColor, Colorant[]][];

    const expectedSeed = [
      ["#ffffff", ["w1"]],
      ["#000000", ["K", "k", "k1"]],
      ["#eeeeee", ["W", "w"]],
    ] as [HexColor, Colorant[]][];

    const sourceColorToColorants = getNewColorToColorants(seed);
    const updateColorToColorants = getNewColorToColorants(updateSeed);
    const mergedColorToColorants = mergeColorToColorants(sourceColorToColorants, [updateColorToColorants]);
    for (const [color, colorants] of expectedSeed) {
      expect(mergedColorToColorants.get(color, OrderedSet()).toArray()).toEqual(colorants);
    }
  });
});

describe("ColorantToColor", () => {
  const seed = [
    ["W", "#ffffff"],
    ["w", "#ffffff"],
    ["K", "#000000"],
    ["k", "#000000"],
  ] as [Colorant, HexColor][];

  test("getNewColorantToColor", () => {
    let colorantToColor: ColorantToColor;

    colorantToColor = getNewColorantToColor();
    for (const [colorant, color] of seed) {
      colorantToColor = colorantToColor.set(colorant, color);
    }
    expect(colorantToColor.toArray()).toEqual(seed);

    colorantToColor = getNewColorantToColor(seed);
    expect(colorantToColor.toArray()).toEqual(seed);
  });

  test("invertColorantToColor", () => {
    const colorantToColor = getNewColorantToColor(seed);
    const colorToColorants = invertColorantToColor(colorantToColor);
    for (const [colorant, color] of seed) {
      expect(colorToColorants.get(color, OrderedSet()).toArray()).toContain(colorant);
    }
  });

  test("mergeColorantToColor", () => {
    const updateSeed = [
      ["w1", "#ffffff"],
      ["k1", "#000000"],
      ["W", "#eeeeee"],
      ["w", "#eeeeee"],
    ] as [Colorant, HexColor][];

    const expectedSeed = [
      ["w1", "#ffffff"],
      ["K", "#000000"],
      ["k", "#000000"],
      ["k1", "#000000"],
      ["W", "#eeeeee"],
      ["w", "#eeeeee"],
    ] as [Colorant, HexColor][];

    const sourceColorantToColor = getNewColorantToColor(seed);
    const updateColorantToColor = getNewColorantToColor(updateSeed);
    const mergedColorantToColor = mergeColorantToColor(sourceColorantToColor, [updateColorantToColor]);
    for (const [colorant, color] of expectedSeed) {
      expect(mergedColorantToColor.get(colorant)).toEqual(color);
    }
  });
});
