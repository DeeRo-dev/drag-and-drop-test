import React, { useState, useRef } from 'react';

interface Props {
  children: React.ReactNode;
}

const Drawer: React.FC<Props> = ({ children }) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  const [startY, setStartY] = useState<number | null>(null);
  const [currentY, setCurrentY] = useState<number>(0);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const drawerHeight = 500; // Altura total del Drawer
  const initialVisibleHeight = 60; // Altura inicial visible del Drawer, solo para el <h1>

  // Maneja el inicio del arrastre
  const handleTouchStart = (e: React.TouchEvent) => {
    setStartY(e.touches[0].clientY);
  };

  // Maneja el movimiento de arrastre
  const handleTouchMove = (e: React.TouchEvent) => {
    if (startY !== null) {
      const deltaY = startY - e.touches[0].clientY; // Calcula el movimiento hacia arriba
      const newCurrentY = Math.max(0, Math.min(drawerHeight - initialVisibleHeight, deltaY)); // Limita el movimiento
      setCurrentY(newCurrentY);
    }
  };

  // Maneja la liberación
  const handleTouchEnd = () => {
    if (currentY > (drawerHeight - initialVisibleHeight) / 4) { // Si se arrastró más de 1/4, expandir
      setIsExpanded(true);
      setCurrentY(drawerHeight - initialVisibleHeight); // Expande completamente
    } else {
      setIsExpanded(false);
      setCurrentY(0); // Contrae completamente
    }
    setStartY(null);
  };

  // Ajusta el estilo del Drawer basado en el estado
  const drawerClasses = `
    select-none fixed bottom-0 left-0 w-full bg-black text-white p-4 z-50 transition-transform
  `;

  return (
    <div
      style={{
        height: `${initialVisibleHeight + currentY}px`, // Ajusta la altura del contenedor padre dinámicamente
        overflow: 'hidden', // Oculta el contenido que se desborda
        transition: 'height 300ms ease', // Suaviza la transición
        position: 'relative', // Asegura que el drawer esté posicionado correctamente
      }}
    >
      <div
        ref={drawerRef}
        className={drawerClasses}
        style={{
          transition: 'transform 300ms ease',
          transform: `translateY(${drawerHeight - initialVisibleHeight - currentY}px)`,
          height: `${drawerHeight}px`,
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {children}
      </div>
    </div>
  );
};

export default Drawer;
