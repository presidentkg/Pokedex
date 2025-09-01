"use client";

import { useState } from "react";
import PokemonCard from "./pokemon-card";
import TypeBtn from "./type-btn";
import { fetchPokemonType } from "@/lib/data/fetchPokemonType";
import { PokemonData } from "@/lib/interfaces";

export default function TypeDisplays() {
    const [pokemonList, setPokemon] = useState<PokemonData[] | null>(null);

    const handlePokemonBtnClick = async (Type: string) => {
        if (pokemonList) {
            setPokemon(null);
        }
        try{
            const data = await fetchPokemonType(Type);
            if(data.length !== 0)
                setPokemon(data);
        } catch (error) {
            setPokemon(null);
            return <div>Couldn't load pokemon, try again later!</div>;
        }
    };

    return (
        <div>
            <section className="flex flex-col items-center gap-4">
                <div className="flex flex-wrap gap-4 justify-center">
                    <TypeBtn type="normal" onClick={handlePokemonBtnClick}/>
                    <TypeBtn type="fire" onClick={handlePokemonBtnClick}/>
                    <TypeBtn type="water" onClick={handlePokemonBtnClick}/>
                    <TypeBtn type="electric" onClick={handlePokemonBtnClick}/>
                    <TypeBtn type="grass" onClick={handlePokemonBtnClick}/>
                    <TypeBtn type="ice" onClick={handlePokemonBtnClick}/>
                    <TypeBtn type="fighting" onClick={handlePokemonBtnClick}/>
                    <TypeBtn type="poison" onClick={handlePokemonBtnClick}/>
                    <TypeBtn type="ground" onClick={handlePokemonBtnClick}/>
                </div>
                <div className="flex flex-wrap gap-4 justify-center">
                    <TypeBtn type="flying" onClick={handlePokemonBtnClick}/>
                    <TypeBtn type="psychic" onClick={handlePokemonBtnClick}/>
                    <TypeBtn type="bug" onClick={handlePokemonBtnClick}/>
                    <TypeBtn type="rock" onClick={handlePokemonBtnClick}/>
                    <TypeBtn type="ghost" onClick={handlePokemonBtnClick}/>
                    <TypeBtn type="dragon" onClick={handlePokemonBtnClick}/>
                    <TypeBtn type="steel" onClick={handlePokemonBtnClick}/>
                    <TypeBtn type="dark" onClick={handlePokemonBtnClick}/>
                    <TypeBtn type="fairy" onClick={handlePokemonBtnClick}/>
                </div>
            </section>
            <div className="flex flex-wrap gap-8 mt-8 justify-center">
                {pokemonList &&  (
                    pokemonList.map((pokemon) => (
                        <PokemonCard key={pokemon.id} {...pokemon} />
                    ))
                )}
            </div>
        </div>
    );
}