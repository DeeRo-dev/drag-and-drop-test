import React from 'react';
import { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSwappingStrategy,
} from "@dnd-kit/sortable";

import { SortableItem } from "./components/SortableItem";

import { createConsecutiveArray } from "./helpers/createArr";

// import Drawer from './components/Drawer/Drawer';
 // Asegúrate de que la ruta sea correcta
 const [items, setItems] = useState<number[]>(createConsecutiveArray(20));
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
 const App: React.FC = () => {
//   return (
//     <div>
//       <Drawer>
//         <h1 className="text-2xl font-bold mb-4">Hola mundo</h1>
//         <p>Aquí puedes mostrar cualquier información que desees en el Drawer.</p>
//         <p>Aquí puedes mostrar cualquier información que desees en el Drawer.</p>
//         <p>Aquí puedes mostrar cualquier información que desees en el Drawer.</p>
//         <p>Aquí puedes mostrar cualquier información que desees en el Drawer.</p>
//         <p>Aquí puedes mostrar cualquier información que desees en el Drawer.</p>

//       </Drawer>
//     </div>
//   );

return (
  <DndContext
    sensors={sensors}
    collisionDetection={closestCenter}
    onDragEnd={handleDragEnd}
  >
    <SortableContext items={items} strategy={rectSwappingStrategy}>
      <div className="flex flex-wrap gap-5 p-5 w-3/6 bg-slate-300 rounded-md m-[5rem]">
        {items.map((id) => (
          <SortableItem key={id} id={id} />
        ))}
      </div>
    </SortableContext>
  </DndContext>
);

function handleDragEnd(event: any) {
  const { active, over } = event;

  if (active.id !== over.id) {
    setItems((items) => {
      const oldIndex = items.indexOf(active.id);
      const newIndex = items.indexOf(over.id);

      return arrayMove(items, oldIndex, newIndex);
    });
  }
}
 };

 export default App;
