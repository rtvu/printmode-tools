import { ReactNode, useContext } from "react";

import { SortableListItemContext } from "./SortableListItemContext";

export type SortableListItemHandleProps = {
  children: ReactNode;
  className?: string;
};

export function SortableListItemHandle(props: SortableListItemHandleProps) {
  const { attributes, listeners, setActivatorNodeRef } = useContext(SortableListItemContext);

  return (
    <button className={props.className} {...attributes} {...listeners} ref={setActivatorNodeRef}>
      {props.children}
    </button>
  );
}
