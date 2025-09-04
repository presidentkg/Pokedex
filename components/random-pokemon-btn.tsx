"use client";

import { fetchRandomPokemon } from "@/lib/data/random-pokemon";
import { PokemonData } from "@/lib/interfaces";
import Image from "next/image";
import { useState } from "react";
import PokemonCard from "@/components/pokemon-card";

export default function RandomPokemonBtn() {
    const [pokemon, setPokemon] = useState<PokemonData | null>(null);

    const handleRandomPokemonBtnClick = async () => {
      try{
        const data = await fetchRandomPokemon(1);
        if(data.length !== 0)
          setPokemon(data[0]);
      } catch (_error) {
        return <div>Couldn&apos;t load pokemon, try again later!</div>;
      }
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
        <PokemonCard pokemon={pokemon} />
      )}
    </div>
  );
}