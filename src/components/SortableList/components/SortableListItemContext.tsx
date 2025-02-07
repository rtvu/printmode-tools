import { DraggableSyntheticListeners } from "@dnd-kit/core";
import { createContext } from "react";

export type SortableListItemContext = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  attributes: Record<string, any>;
  listeners: DraggableSyntheticListeners;
  setActivatorNodeRef: (node: HTMLElement | null) => void;
};

export const SortableListItemContext = createContext<SortableListItemContext>({
  attributes: {},
  listeners: undefined,
  setActivatorNodeRef: () => {
    return;
  },
});
