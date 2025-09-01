"use client";

import { typeColorsBg } from "@/lib/pokemon-colors";

export default function TypeBtn({
  type,
  onClick,
}: {
  type: string;
  onClick: (type: string) => void;
}) {
    return(
    <div>
        <button
            className={`p-2 pl-6 pr-6 mt-4 mb-14 cursor-pointer text-xl text-white rounded-full font-bold flex items-center justify-center gap-1 ${typeColorsBg[type]}`} 
            onClick={() => onClick(type)}
        >
            {type}
        </button>
    </div>
    );
}