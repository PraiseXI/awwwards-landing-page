"use client"

import ThiingsGrid, { type ItemConfig } from "../../lib/ThiingsGrid";

const SimpleNumberCell = ({ gridIndex }: ItemConfig) => (
  <div className="absolute inset-1 flex items-center justify-center bg-blue-50 border border-blue-500 rounded text-sm font-bold text-blue-800">
    {gridIndex}
  </div>
);

export default function WorkPage() {
  return (
    <div className="w-screen h-screen relative">
      <ThiingsGrid
        gridSize={80}
        renderItem={SimpleNumberCell}
        initialPosition={{ x: 0, y: 0 }}
      />
    </div>
  );
}