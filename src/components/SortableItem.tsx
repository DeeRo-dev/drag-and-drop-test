import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export function SortableItem(props: any) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    backgroundColor: isDragging ? "#007598" : "#000098",
    // scale: isDragging ? '1 1' : '1.2 1.2',
    width: "125px",
    height: "125px",
    color: "white",
    padding: "15px",
    borderRadius: "10px",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <p>{props.id}</p>
    </div>
  );
}
