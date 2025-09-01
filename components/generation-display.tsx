"use client";

import { useState } from "react";
import GenerationBtn from "./generation-btn";
import { PokemonData } from "@/lib/interfaces";
import { fetchPokemonGeneration } from "@/lib/data/fetch-pokemon-generation";
import PokemonCard from "./pokemon-card";

export default function GenerationDisplays() {
    const [pokemonList, setPokemon] = useState<PokemonData[] | null>(null);

    const handlePokemonBtnClick = async (generation: number) => {
        if (pokemonList) {
            setPokemon(null);
        }
        try{
            const data = await fetchPokemonGeneration(generation);
            if(data.length !== 0)
                setPokemon(data);
        } catch (error) {
            setPokemon(null);
            return <div>Couldn't load pokemon, try again later!</div>;
        }
    };

    return (
        <div>
            <div className="flex justify-center gap-4">
                <GenerationBtn generation={1} onClick={handlePokemonBtnClick}/>
                <GenerationBtn generation={2} onClick={handlePokemonBtnClick}/>
                <GenerationBtn generation={3} onClick={handlePokemonBtnClick}/>
                <GenerationBtn generation={4} onClick={handlePokemonBtnClick}/>
                <GenerationBtn generation={5} onClick={handlePokemonBtnClick}/>
                <GenerationBtn generation={6} onClick={handlePokemonBtnClick}/>
                <GenerationBtn generation={7} onClick={handlePokemonBtnClick}/>
                <GenerationBtn generation={8} onClick={handlePokemonBtnClick}/>
                <GenerationBtn generation={9} onClick={handlePokemonBtnClick}/>
            </div>
            <div className="flex flex-wrap gap-8 mt-8 justify-center">
                {pokemonList &&  (
                    pokemonList.map((pokemon) => (
                        <PokemonCard key={pokemon.id} pokemon={pokemon} />
                    ))
                )}
            </div>
        </div>
    );
}