import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { HexColor } from "../../common/color";
import { Colorant } from "../../common/colorant";
import DefaultMap from "../../common/DefaultMap";
import { getItem, removeItem, setItem } from "../../common/localStorage";

const LOCAL_STORAGE_ITEM = "ColorantsDefinitions";

export type ColorantsDefinition = {
  color: string;
  colorants: string;
};

const defaultColorantsDefinitions: ColorantsDefinition[] = [
  { color: "#00ffff", colorants: "C, C0, C1, C2" },
  {
    color: "#aaffff",
    colorants: "c, c0, c1, c2, lc, lc0, lc1, lc2, Lc, Lc0, Lc1, Lc2, LC, LC0, LC1, LC2",
  },
  {
    color: "#ff00ff",
    colorants: "M, M0, M1, M2",
  },
  {
    color: "#ffaaff",
    colorants: "m, m0, m1, m2, lm, lm0, lm1, lm2, Lm, Lm0, Lm1, Lm2, LM, LM0, LM1, LM2",
  },
  {
    color: "#ffff00",
    colorants: "Y, Y0, Y1, Y2",
  },
  {
    color: "#000000",
    colorants: "K, K0, K1, K2",
  },
  {
    color: "#eeeeff",
    colorants: "p, p0, p1, p2, pt, pt0, pt1, pt2, P, P0, P1, P2, Pt, Pt0, Pt1, Pt2, PT, PT0, PT1, PT2",
  },
  {
    color: "#eeffee",
    colorants: "s, s0, s1, s2, S, S0, S1, S2, oc, oc0, oc1, oc2, Oc, Oc0, Oc1, Oc2, OC, OC0, OC1, OC2",
  },
  {
    color: "#ffeeee",
    colorants: "w, w0, w1, w2, W, W0, W1, W2, wh, wh0, wh1, wh2, Wh, Wh0, Wh1, Wh2, WH, WH0, WH1, WH2",
  },
];

export type ColorantToColor = Record<Colorant, HexColor>;

function updateColorantToColor(colorantToColor: ColorantToColor, colorantsDefinitions: ColorantsDefinition[]): void {
  for (const colorantsDefinition of colorantsDefinitions) {
    const color = colorantsDefinition.color as HexColor;
    const colorants = colorantsDefinition.colorants.split(",").map((colorant) => colorant.trim()) as Colorant[];
    for (const colorant of colorants) {
      colorantToColor[colorant] = color;
    }
  }
}

const defaultColorantToColor: ColorantToColor = {};
updateColorantToColor(defaultColorantToColor, defaultColorantsDefinitions);

export type ColorToColorants = [HexColor, Colorant[]][];

function toColorToColorants(colorantToColor: ColorantToColor): ColorToColorants {
  const temporaryColorToColorants = new DefaultMap<HexColor, Set<Colorant>>(() => new Set());
  const temporaryColors = new Set<HexColor>();

  for (const [colorant, color] of Object.entries(colorantToColor)) {
    temporaryColors.add(color);
    temporaryColorToColorants.get(color).add(colorant as Colorant);
  }

  const colorToColorants: ColorToColorants = [];
  const colors = [...temporaryColors].sort();
  for (const color of colors) {
    const colorants = [...temporaryColorToColorants.get(color)].sort();
    colorToColorants.push([color, colorants]);
  }

  return colorToColorants;
}

export type ColorantDictionaryState = {
  colorantToColor: ColorantToColor;
  colorToColorants: ColorToColorants;
  serializedColorantsDefinitions: string;
};

function updateColorantDictionaryState(serializedColorantsDefinitions: string): ColorantDictionaryState {
  const colorantsDefinitions = JSON.parse(serializedColorantsDefinitions) as ColorantsDefinition[];

  const colorantToColor = { ...defaultColorantToColor };
  updateColorantToColor(colorantToColor, colorantsDefinitions);

  const colorToColorants = toColorToColorants(colorantToColor);

  return {
    colorantToColor,
    colorToColorants,
    serializedColorantsDefinitions,
  };
}

function getInitialState(): ColorantDictionaryState {
  const serializedColorantsDefinitions = getItem(LOCAL_STORAGE_ITEM, "[]");

  return updateColorantDictionaryState(serializedColorantsDefinitions);
}

const initialState: ColorantDictionaryState = getInitialState();

const colorantDictionarySlice = createSlice({
  name: "colorantDictionary",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateColorantsDefinitions.fulfilled, (_state, action: PayloadAction<string>) => {
      return updateColorantDictionaryState(action.payload);
    });
    builder.addCase(clearColorantsDefinitions.fulfilled, (_state, action: PayloadAction<string>) => {
      return updateColorantDictionaryState(action.payload);
    });
  },
});

export const updateColorantsDefinitions = createAsyncThunk(
  "colorantDictionary/updateColorantsDefinitions",
  // eslint-disable-next-line @typescript-eslint/require-await
  async (serializedColorantsDefinitions: string): Promise<string> => {
    setItem(LOCAL_STORAGE_ITEM, serializedColorantsDefinitions);

    return serializedColorantsDefinitions;
  },
);

export const clearColorantsDefinitions = createAsyncThunk(
  "colorantDictionary/clearColorantsDefinitions",
  // eslint-disable-next-line @typescript-eslint/require-await
  async (): Promise<string> => {
    removeItem(LOCAL_STORAGE_ITEM);

    return "[]";
  },
);

export const colorantDictionaryReducer = colorantDictionarySlice.reducer;
