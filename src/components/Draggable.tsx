import {useDraggable} from '@dnd-kit/core';

export function Draggable(props: any) {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: props.id,
  });
  
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0) rotate3d(1, 1, 1, 15deg)`,
  } : undefined;
  
  return (
    <button ref={setNodeRef} className='bg-cyan-300 p-3 text-lg rounded-md' style={style} {...listeners} {...attributes}>
      {props.children}
    </button>
  );
}

