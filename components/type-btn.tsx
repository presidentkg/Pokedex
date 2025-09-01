"use client";

import { textColors, typeColorsBg, typeColorsBgLighter, typeColorsBorder } from "@/lib/pokemon-colors";

export default function TypeBtn({
  type,
  onClick,
  isActive,
}: {
  type: string;
  onClick: (type: string) => void;
  isActive: boolean;
}) {
  const activeClassName = isActive ? `border-4 ${typeColorsBorder[type]} ${typeColorsBgLighter[type]} ${textColors[type]}` : `text-white ${typeColorsBg[type]}`;
  return(
    <div>
        <button
            className={`p-2 pl-6 pr-6 mt-4 mb-14 cursor-pointer text-xl rounded-full font-bold flex items-center justify-center gap-1 ${activeClassName}`} //${typeColorsBg[type]}
            onClick={() => onClick(type)}
        >
            {type}
        </button>
    </div>
  );
}
