import { useDroppable } from "@dnd-kit/core";

export function Droppable(props: any) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`${isOver ? "shadow-lg opacity-75" : "shadow-sm opacity-100"} 
      w-full bg-red-300 h-[15vh] p-5 rounded-lg`}
    >
      {props.children}
    </div>
  );
}
