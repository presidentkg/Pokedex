"use client";

import { generationColors } from "@/lib/pokemon-colors";

export default function GenerationBtn({
  generation,
  onClick,
}: {
  generation: number;
  onClick: (generation: number) => void;
}) {
    return(
    <div>
        <button
            className={`p-2 pl-6 pr-6 mt-4 mb-14 cursor-pointer text-xl text-white rounded-full font-bold flex items-center justify-center gap-1 ${generationColors[generation]}`} 
            onClick={() => onClick(generation)}
        >
            Gen {generation}
        </button>
    </div>
    );
}