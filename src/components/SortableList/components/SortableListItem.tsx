import { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CSSProperties, ReactNode, useMemo } from "react";

import { SortableListItemContext } from "./SortableListItemContext";

export type SortableListItemProps = {
  children: ReactNode;
  className?: string;
  id: UniqueIdentifier;
};

export function SortableListItem({ children, className, id }: SortableListItemProps) {
  const { attributes, isDragging, listeners, setNodeRef, setActivatorNodeRef, transform, transition } = useSortable({
    id,
  });

  const context = useMemo(
    () => ({
      attributes,
      listeners,
      setActivatorNodeRef: setActivatorNodeRef,
    }),
    [attributes, listeners, setActivatorNodeRef],
  );

  const style: CSSProperties = {
    opacity: isDragging ? 0.4 : undefined,
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <SortableListItemContext.Provider value={context}>
      <li className={className} ref={setNodeRef} style={style}>
        {children}
      </li>
    </SortableListItemContext.Provider>
  );
}
