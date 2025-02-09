import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

import { HexColor, toHexColor } from "../../common/color";
import { Colorant, isColorant } from "../../common/colorant";
import { DefaultMap } from "../../common/DefaultMap";
import { reduceIterable } from "../../common/utilities";
import {
  ColorantsDefinition,
  clearColorantsDefinitions,
  updateColorantsDefinitions,
} from "../../state/colorantDictionary/colorantDictionarySlice";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { SortableList, SortableListItem } from "../SortableList";
import { ColorToColorantsInputs, ColorToColorantsInputsProps } from "./components/ColorToColorantsInputs";

type Id = string;

type Entry = {
  id: Id;
  color: string;
  colorants: string;
  lastColor: string;
};

type Errors = {
  invalidColors: Set<Id>;
  nonUniqueColors: Set<Id>;
  invalidColorants: DefaultMap<Id, Set<string>>;
  nonUniqueColorants: DefaultMap<Id, Set<Colorant>>;
  hasEmptyColorants: Set<Id>;
};

function processColor(entry: Entry, errors: Errors, seenColors: Record<HexColor, Id>): void {
  const color = toHexColor(entry.color);
  if (color !== null) {
    if (color in seenColors) {
      errors.nonUniqueColors.add(seenColors[color]);
      errors.nonUniqueColors.add(entry.id);
    } else {
      seenColors[color] = entry.id;
    }
  } else {
    errors.invalidColors.add(entry.id);
  }
}

function processColorants(entry: Entry, errors: Errors, seenColorants: Record<Colorant, Id>): void {
  const colorants = entry.colorants.split(",").map((colorant) => colorant.trim());
  for (const colorant of colorants) {
    if (colorant !== "") {
      if (isColorant(colorant)) {
        if (colorant in seenColorants) {
          errors.nonUniqueColorants.get(seenColorants[colorant]).add(colorant);
          errors.nonUniqueColorants.get(entry.id).add(colorant);
        } else {
          seenColorants[colorant] = entry.id;
        }
      } else {
        errors.invalidColorants.get(entry.id).add(colorant);
      }
    } else {
      errors.hasEmptyColorants.add(entry.id);
    }
  }
}

function processEntries(entries: Entry[], errors: Errors): void {
  const seenColors: Record<HexColor, Id> = {};
  const seenColorants: Record<Colorant, Id> = {};
  for (const entry of entries) {
    processColor(entry, errors, seenColors);
    processColorants(entry, errors, seenColorants);
  }
}

function checkErrors(errors: Errors): boolean {
  const invalidColorantsSize = reduceIterable(
    errors.invalidColorants,
    (accumulator, currentElement) => accumulator + currentElement[1].size,
    0,
  );

  const nonUniqueColorantsSize = reduceIterable(
    errors.nonUniqueColorants,
    (accumulator, currentElement) => accumulator + currentElement[1].size,
    0,
  );

  return (
    errors.invalidColors.size !== 0 ||
    errors.nonUniqueColors.size !== 0 ||
    invalidColorantsSize !== 0 ||
    nonUniqueColorantsSize !== 0 ||
    errors.hasEmptyColorants.size !== 0
  );
}

function newEntry(color = "#ffffff", colorants = "", lastColor = "#ffffff"): Entry {
  return { id: uuid(), color, colorants, lastColor };
}

function restoreStoredSerializedColorantsDefinitions(
  storedSerializedColorantsDefinitions: string,
  setEntries: Dispatch<SetStateAction<Entry[]>>,
): void {
  const colorantsDefinitions = JSON.parse(storedSerializedColorantsDefinitions) as ColorantsDefinition[];
  if (colorantsDefinitions.length > 0) {
    setEntries(
      colorantsDefinitions.map(({ color, colorants }) => {
        return newEntry(color, colorants, color);
      }),
    );
  } else {
    setEntries([newEntry()]);
  }
}

export function DefineColorants() {
  const storedSerializedColorantsDefinitions = useAppSelector(
    (state) => state.colorantDictionary.serializedColorantsDefinitions,
  );
  const dispatch = useAppDispatch();

  const [entries, setEntries] = useState<Entry[]>([]);

  const serializedFormattedColorantsDefinitions = JSON.stringify(
    entries.map(({ color, colorants }) => {
      const formattedColor = toHexColor(color);
      const formattedColorants = colorants
        .split(",")
        .map((colorant) => colorant.trim())
        .sort()
        .join(", ");
      return { color: formattedColor, colorants: formattedColorants };
    }),
  );

  const serializedColorantsDefinitions = JSON.stringify(
    entries.map(({ color, colorants }) => {
      return { color, colorants };
    }),
  );

  useEffect(() => {
    restoreStoredSerializedColorantsDefinitions(storedSerializedColorantsDefinitions, setEntries);
  }, [storedSerializedColorantsDefinitions, setEntries]);

  const onClickAddEntry = (): void => {
    setEntries((entries) => [...entries, newEntry()]);
  };

  const onClickSetDefinitions = (): void => {
    void dispatch(updateColorantsDefinitions(serializedFormattedColorantsDefinitions));
  };

  const onClickResetDefinitions = (): void => {
    restoreStoredSerializedColorantsDefinitions(storedSerializedColorantsDefinitions, setEntries);
  };

  const onClickClearDefinitions = (): void => {
    setEntries([newEntry()]);
    void dispatch(clearColorantsDefinitions());
  };

  const getOnChangeColorEntry = (id: Id): ((color: string) => void) => {
    return (color: string) => {
      const hexColor = toHexColor(color);

      setEntries((entries) =>
        entries.map((entry) => {
          if (entry.id === id) {
            entry = { ...entry, color: color };
            if (hexColor !== null) {
              entry.lastColor = color;
            }
          }

          return entry;
        }),
      );
    };
  };

  const getOnChangeColorantsEntry = (id: Id): ((colorants: string) => void) => {
    return (colorants: string) => {
      setEntries((entries) =>
        entries.map((entry) => {
          if (entry.id === id) {
            entry = { ...entry, colorants: colorants };
          }

          return entry;
        }),
      );
    };
  };

  const getOnClickDeleteEntry = (id: Id): (() => void) => {
    return () => {
      setEntries((entries) => {
        entries = entries.filter(({ id: currentId }) => currentId !== id);
        if (entries.length === 0) {
          entries = [newEntry()];
        }

        return entries;
      });
    };
  };

  const errors: Errors = {
    invalidColors: new Set(),
    nonUniqueColors: new Set(),
    invalidColorants: new DefaultMap(() => new Set()),
    nonUniqueColorants: new DefaultMap(() => new Set()),
    hasEmptyColorants: new Set(),
  };

  processEntries(entries, errors);

  const getDefineColorantsInputs = (entry: Entry) => {
    const colorants = entry.colorants
      .split(",")
      .map((colorant) => colorant.trim())
      .filter((colorant, index, array) => array.indexOf(colorant) === index);

    const props: ColorToColorantsInputsProps = {
      color: entry.color,
      onChangeColor: getOnChangeColorEntry(entry.id),
      isInvalidColor: errors.invalidColors.has(entry.id),
      isNonUniqueColor: errors.nonUniqueColors.has(entry.id),
      lastColor: entry.lastColor,
      colorants: entry.colorants,
      onChangeColorants: getOnChangeColorantsEntry(entry.id),
      invalidColorants: colorants.filter((colorant) => errors.invalidColorants.get(entry.id).has(colorant)),
      nonUniqueColorants: colorants.filter((colorant) =>
        !isColorant(colorant) ? false : errors.nonUniqueColorants.get(entry.id).has(colorant),
      ),
      hasEmptyColorant: errors.hasEmptyColorants.has(entry.id),
      onClickDelete: getOnClickDeleteEntry(entry.id),
    };

    return <ColorToColorantsInputs {...props} />;
  };

  return (
    <div className="mx-auto mt-3 max-w-[600px]">
      <ColorToColorantsInputs isHeader />
      <SortableList
        items={entries}
        onChange={setEntries}
        renderItem={(entry: Entry) => (
          <SortableListItem className="list-none" id={entry.id}>
            {getDefineColorantsInputs(entry)}
          </SortableListItem>
        )}
      />
      <div className="flex">
        <button type="button" className="btn btn-sm mr-3" onClick={onClickAddEntry}>
          Add
        </button>
        <button
          type="button"
          className="btn btn-sm mr-3"
          disabled={checkErrors(errors) || storedSerializedColorantsDefinitions === serializedColorantsDefinitions}
          onClick={onClickSetDefinitions}
        >
          Set
        </button>
        <button
          type="button"
          className="btn btn-sm mr-auto"
          disabled={
            storedSerializedColorantsDefinitions === "[]" ||
            storedSerializedColorantsDefinitions === serializedColorantsDefinitions
          }
          onClick={onClickResetDefinitions}
        >
          Reset
        </button>
        <button type="button" className="btn btn-sm ml-3" onClick={onClickClearDefinitions}>
          Clear
        </button>
      </div>
    </div>
  );
}
