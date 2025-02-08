import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

import { SortableListItemHandle } from "../../SortableList";

export type ColorToColorantsInputsProps =
  | { isHeader: true }
  | {
      color: string;
      onChangeColor: (color: string) => void;
      isInvalidColor: boolean;
      isNonUniqueColor: boolean;
      lastColor: string;
      colorants: string;
      onChangeColorants: (colorants: string) => void;
      invalidColorants: string[];
      nonUniqueColorants: string[];
      hasEmptyColorant: boolean;
      onClickDelete: () => void;
    };

export function ColorToColorantsInputs(props: ColorToColorantsInputsProps) {
  if ("isHeader" in props) {
    return (
      <div className="mx-auto -mb-2">
        <div className="flex">
          <div className="w-[36px] shrink-0"></div>
          <div className="w-[167px] shrink-0 text-xl">Color</div>
          <div className="w-full text-xl">Colorants</div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="mx-auto my-3">
        <div className="flex">
          <div className="mr-3 w-[24px] shrink-0 content-center">
            <SortableListItemHandle className="btn btn-square btn-xs">
              <Bars3Icon />
            </SortableListItemHandle>
          </div>
          <div className="join">
            <input
              type="color"
              className={`input input-sm join-item -py-1 w-[60px] shrink-0 px-1 ${props.isInvalidColor || props.isNonUniqueColor ? "input-error" : ""}`}
              value={props.lastColor}
              onChange={(event) => props.onChangeColor(event.target.value)}
            />
            <input
              type="text"
              className={`input input-sm join-item mr-3 w-[96px] shrink-0 ${props.isInvalidColor || props.isNonUniqueColor ? "input-error text-error" : ""}`}
              maxLength={7}
              value={props.color}
              onChange={(event) => props.onChangeColor(event.target.value)}
            />
          </div>

          <input
            type="text"
            className={`input input-sm mr-3 w-full ${props.invalidColorants.length === 0 && props.nonUniqueColorants.length === 0 && !props.hasEmptyColorant ? "" : "input-error text-error"}`}
            value={props.colorants}
            onChange={(event) => props.onChangeColorants(event.target.value)}
          />
          <button className="btn btn-sm btn-square" onClick={props.onClickDelete}>
            <div className="w-[20px] shrink-0">
              <XMarkIcon />
            </div>
          </button>
        </div>
      </div>
    );
  }
}
