import { Active, DndContext, DragOverlay, PointerSensor, UniqueIdentifier, useSensor, useSensors } from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { Fragment, ReactNode, useMemo, useState } from "react";

export type SortableListBaseItem = {
  id: UniqueIdentifier;
};

export type SortableListProps<T extends SortableListBaseItem> = {
  className?: string;
  items: T[];
  onChange: (items: T[]) => void;
  renderItem: (item: T) => ReactNode;
};

export function SortableList<T extends SortableListBaseItem>({
  className,
  items,
  onChange,
  renderItem,
}: SortableListProps<T>) {
  const [active, setActive] = useState<Active | null>(null);

  const activeItem = useMemo(() => items.find((item) => item.id === active?.id), [active, items]);

  const sensors = useSensors(useSensor(PointerSensor));

  return (
    <DndContext
      modifiers={[restrictToVerticalAxis]}
      sensors={sensors}
      onDragStart={({ active }) => {
        setActive(active);
      }}
      onDragEnd={({ active, over }) => {
        if (over && active.id !== over?.id) {
          const activeIndex = items.findIndex(({ id }) => id === active.id);
          const overIndex = items.findIndex(({ id }) => id === over.id);

          onChange(arrayMove(items, activeIndex, overIndex));
        }
        setActive(null);
      }}
      onDragCancel={() => {
        setActive(null);
      }}
    >
      <SortableContext items={items}>
        <ul className={className}>
          {items.map((item) => (
            <Fragment key={item.id}>{renderItem(item)}</Fragment>
          ))}
        </ul>
      </SortableContext>
      <DragOverlay>{activeItem ? renderItem(activeItem) : null}</DragOverlay>
    </DndContext>
  );
}
