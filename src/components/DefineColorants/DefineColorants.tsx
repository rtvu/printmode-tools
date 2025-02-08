import { useState } from "react";
import { v4 as uuid } from "uuid";

import { HexColor, toHexColor } from "../../common/color";
import { Colorant, isColorant } from "../../common/colorant";
import { DefaultMap } from "../../common/DefaultMap";
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

const processColorants = (entry: Entry, errors: Errors, seenColorants: Record<Colorant, Id>): void => {
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
};

const processEntries = (entries: Entry[], errors: Errors): void => {
  const seenColors: Record<HexColor, Id> = {};
  const seenColorants: Record<Colorant, Id> = {};
  for (const entry of entries) {
    processColor(entry, errors, seenColors);
    processColorants(entry, errors, seenColorants);
  }
};

const initialEntry: Entry = { id: uuid(), color: "#ffffff", colorants: "", lastColor: "#ffffff" };

export function DefineColorants() {
  const [entries, setEntries] = useState<Entry[]>([initialEntry]);

  const onAddEntry = (): void => {
    setEntries((entries) => [...entries, { id: uuid(), color: "#ffffff", colorants: "", lastColor: "#ffffff" }]);
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
          entries = [{ id: uuid(), color: "#ffffff", colorants: "", lastColor: "#ffffff" }];
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
      <div>
        <button type="button" className="btn btn-sm" onClick={onAddEntry}>
          Add Entry
        </button>
      </div>
    </div>
  );
}
