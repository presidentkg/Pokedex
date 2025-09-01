"use client";

import { generationColors, generationColorsBorder, generationColorsLighter, generationTextColors } from "@/lib/pokemon-colors";

export default function GenerationBtn({
  gen,
  onClick,
  isActive
}: {
  gen: number;
  onClick: (gen: number) => void;
  isActive: boolean;
}) {
  const activeClassName = isActive ? `border-4 ${generationColorsBorder[gen]} ${generationColorsLighter[gen]} ${generationTextColors[gen]}` : `text-white ${generationColors[gen]}`;
  return(
    <div>
        <button
            className={`p-2 pl-6 pr-6 mt-4 mb-14 cursor-pointer text-xl rounded-full font-bold flex items-center justify-center gap-1 ${activeClassName}`} 
            onClick={() => onClick(gen)}
        >
            Gen {gen}
        </button>
    </div>
  );
}