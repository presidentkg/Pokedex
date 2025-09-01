"use client";

import { useState } from "react";
import GenerationBtn from "./generation-btn";
import { PokemonData } from "@/lib/interfaces";
import { fetchPokemonGeneration } from "@/lib/data/fetch-pokemon-generation";
import PokemonCard from "./pokemon-card";

export default function GenerationDisplays() {
    const [pokemonList, setPokemon] = useState<PokemonData[] | null>(null);
    const [activeGen, setActiveGen] = useState<number | null>(null);

    const handlePokemonBtnClick = async (gen: number) => {
        if(gen === activeGen){
            setPokemon(null);
            setActiveGen(null);
        }
        else{
            setActiveGen(gen);
            try{
                const data = await fetchPokemonGeneration(gen);
                if(data.length !== 0)
                    setPokemon(data);
            } catch (error) {
                setPokemon(null);
                return <div>Couldn't load pokemon, try again later!</div>;
            }
        }
    };

    return (
        <div>
            <div className="flex justify-center gap-4">
                <GenerationBtn gen={1} onClick={handlePokemonBtnClick} isActive={activeGen === 1}/>
                <GenerationBtn gen={2} onClick={handlePokemonBtnClick} isActive={activeGen === 2}/>
                <GenerationBtn gen={3} onClick={handlePokemonBtnClick} isActive={activeGen === 3}/>
                <GenerationBtn gen={4} onClick={handlePokemonBtnClick} isActive={activeGen === 4}/>
                <GenerationBtn gen={5} onClick={handlePokemonBtnClick} isActive={activeGen === 5}/>
                <GenerationBtn gen={6} onClick={handlePokemonBtnClick} isActive={activeGen === 6}/>
                <GenerationBtn gen={7} onClick={handlePokemonBtnClick} isActive={activeGen === 7}/>
                <GenerationBtn gen={8} onClick={handlePokemonBtnClick} isActive={activeGen === 8}/>
                <GenerationBtn gen={9} onClick={handlePokemonBtnClick} isActive={activeGen === 9}/>
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