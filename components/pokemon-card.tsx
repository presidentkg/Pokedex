import { PokemonData } from "@/lib/interfaces";
import { textColors, typeColorsBg, typeColorsBgLighter, typeColorsBorder } from "@/lib/pokemon-colors";
import Image from "next/image";

export default function PokemonCard({
  name,
  id,
  image,
  types,
  hp,
  attack,
  defense,
}: PokemonData) {
  const primaryType = types[0];
  return (
    <div className="flex flex-col items-center w-50 h-96 rounded-2xl bg-[#F1FDFF] p-6 shadow-md border-4 border-blue-400">
      <div className={`flex items-center justify-center h-28 w-28 rounded-full border-4 ${typeColorsBorder[primaryType] || "border-gray-400"} bg-white`}>
        {image ? (
        <Image src={image} alt={name} width={96} height={96} />
        ) : (
          <div className="px-4 text-center text-lg font-bold">No image available</div>
        )}
      </div>
      <div className="flex flex-col items-center mt-4">
        <span className={`px-2 py-0.5 text-sm font-bold ${textColors[primaryType] || "text-white"} rounded-full ${typeColorsBgLighter[primaryType] || "bg-gray-200"}`}>
          #{String(id).padStart(3, "0")}
        </span>
        <h3 className="mt-2 text-2xl font-bold capitalize text-gray-800">
          {name}
        </h3>
      </div>
      <div className="flex gap-2 mt-2">
        {types.map((type) => (
          <span
            key={type}
            className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${typeColorsBg[type] || "bg-gray-400"} text-white`}
          >
            {type}
          </span>
        ))}
      </div>
      <div className="mt-4 w-full text-gray-700">
        <div className="flex justify-between">
          <span>HP</span>
          <span className="font-bold">{hp}</span>
        </div>
        <div className="flex justify-between">
          <span>Attack</span>
          <span className="font-bold">{attack}</span>
        </div>
        <div className="flex justify-between">
          <span>Defense</span>
          <span className="font-bold">{defense}</span>
        </div>
      </div>
    </div>
)};