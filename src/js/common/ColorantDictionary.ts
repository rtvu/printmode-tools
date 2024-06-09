import { OrderedMap, OrderedSet } from "immutable";

import { HexColor, toFormattedHexColor } from "./HexColor";
import { Colorant, isColorant } from "./Colorant";

export type ColorToColorants = OrderedMap<HexColor, OrderedSet<Colorant>>;

export type ColorantToColor = OrderedMap<Colorant, HexColor>;

const reference: [string, string[]][] = [
  ["#00ffff", ["C", "C0", "C1", "C2"]],
  [
    "#aaffff",
    ([] as string[]).concat(
      ["c", "c0", "c1", "c2"],
      ["lc", "lc0", "lc1", "lc2"],
      ["Lc", "Lc0", "Lc1", "Lc2"],
      ["LC", "LC0", "LC1", "LC2"],
    ),
  ],
  ["#ff00ff", ["M", "M0", "M1", "M2"]],
  [
    "#ffaaff",
    ([] as string[]).concat(
      ["m", "m0", "m1", "m2"],
      ["lm", "lm0", "lm1", "lm2"],
      ["Lm", "Lm0", "Lm1", "Lm2"],
      ["LM", "LM0", "LM1", "LM2"],
    ),
  ],
  ["#ffff00", ["Y", "Y0", "Y1", "Y2"]],
  ["#000000", ["K", "K0", "K1", "K2"]],
  [
    "#eeeeff",
    ([] as string[]).concat(
      ["p", "p0", "p1", "p2"],
      ["pt", "pt0", "pt1", "pt2"],
      ["P", "P0", "P1", "P2"],
      ["Pt", "Pt0", "Pt1", "Pt2"],
      ["PT", "PT0", "PT1", "PT2"],
    ),
  ],
  [
    "#eeffee",
    ([] as string[]).concat(
      ["s", "s0", "s1", "s2"],
      ["S", "S0", "S1", "S2"],
      ["oc", "oc0", "oc1", "oc2"],
      ["Oc", "Oc0", "Oc1", "Oc2"],
      ["OC", "OC0", "OC1", "OC2"],
    ),
  ],
  [
    "#ffeeee",
    ([] as string[]).concat(
      ["w", "w0", "w1", "w2"],
      ["W", "W0", "W1", "W2"],
      ["wh", "wh0", "wh1", "wh2"],
      ["Wh", "Wh0", "Wh1", "Wh2"],
      ["WH", "WH0", "WH1", "WH2"],
    ),
  ],
];

let colorToColorants: ColorToColorants = OrderedMap();
for (const [colorString, colorantStrings] of reference) {
  const color = toFormattedHexColor(colorString);
  if (color !== null) {
    const colorants = colorantStrings.reduce((colorants, colorant) => {
      if (isColorant(colorant)) {
        return colorants.add(colorant);
      } else {
        return colorants;
      }
    }, OrderedSet<Colorant>());

    colorToColorants = colorToColorants.set(color, colorants);
  }
}
export const referenceColorToColorants = colorToColorants;

export function getNewColorToColorants(
  iterable?: Iterable<[HexColor, Colorant[] | OrderedSet<Colorant>]>,
): ColorToColorants {
  if (iterable === undefined) {
    return OrderedMap();
  } else {
    const newIterable: [HexColor, OrderedSet<Colorant>][] = [];
    for (const [hexColor, colorants] of iterable) {
      if (Array.isArray(colorants)) {
        newIterable.push([hexColor, OrderedSet(colorants)]);
      } else {
        newIterable.push([hexColor, colorants]);
      }
    }

    return OrderedMap(newIterable);
  }
}

export function invertColorToColorants(colorToColorants: ColorToColorants): ColorantToColor {
  return OrderedMap<Colorant, HexColor>().withMutations((colorantToColor) => {
    for (const [color, colorants] of colorToColorants.entries()) {
      for (const colorant of colorants.values()) {
        colorantToColor.set(colorant, color);
      }
    }
  });
}

export function getNewColorantToColor(iterable?: Iterable<[Colorant, HexColor]>): ColorantToColor {
  return OrderedMap(iterable);
}

export function invertColorantToColor(colorantToColor: ColorantToColor): ColorToColorants {
  return OrderedMap<HexColor, OrderedSet<Colorant>>().withMutations((colorToColorants) => {
    for (const [colorant, color] of colorantToColor.entries()) {
      const colorants = colorToColorants.get(color);
      if (colorants === undefined) {
        colorToColorants.set(color, OrderedSet([colorant]).asMutable());
      } else {
        colorants.add(colorant);
      }
    }

    for (const [color, colorants] of colorToColorants.entries()) {
      colorToColorants.set(color, colorants.asImmutable());
    }
  });
}

export function mergeColorantToColor(source: ColorantToColor, updates: Iterable<ColorantToColor>): ColorantToColor {
  for (const update of updates) {
    source = source.merge(update);
  }

  return source;
}

export function mergeColorToColorants(source: ColorToColorants, updates: Iterable<ColorToColorants>): ColorToColorants {
  let invertedSource = invertColorToColorants(source);
  for (const update of updates) {
    const invertedUpdate = invertColorToColorants(update);
    invertedSource = invertedSource.merge(invertedUpdate);
  }

  return invertColorantToColor(invertedSource);
}
