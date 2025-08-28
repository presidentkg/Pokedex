"use client";

import { fetchRandomPokemon } from "@/lib/data/randomPokemons";
import { PokemonData } from "@/lib/interfaces";
import Image from "next/image";
import { useState } from "react";
import PokemonCard from "@/components/PokemonCard";

export default function RandomPokemonBtn() {
    const [pokemon, setPokemon] = useState<PokemonData | null>(null);

    const handleRandomPokemonBtnClick = async () => {
        const data = await fetchRandomPokemon(1);
        if(data.length !== 0)
          setPokemon(data[0]);
    };
  return(
    <div>
      <button
          className="btn-primary" 
          onClick={handleRandomPokemonBtnClick}
      >
          <Image
          src="/Dice.svg"
          width={25}
          height={25}
          alt="Dice"
          />
          Random Pokémon
      </button>
      {pokemon && (
        <PokemonCard {...pokemon} />
      )}
    </div>
  );
}