"use client";

import { useState } from "react";
import PokemonCard from "./pokemon-card";
import TypeBtn from "./type-btn";
import { fetchPokemonType } from "@/lib/data/fetch-pokemon-type";
import { PokemonData } from "@/lib/interfaces";

export default function TypeDisplays() {
    const [pokemonList, setPokemon] = useState<PokemonData[] | null>(null);
    const [activeType, setActiveType] = useState<string | null>(null);

    const handlePokemonBtnClick = async (Type: string) => {
        if(Type === activeType){
            setPokemon(null);
            setActiveType(null);
        }
        else{
            setActiveType(Type);
            try{
                const data = await fetchPokemonType(Type);
                if(data.length !== 0)
                    setPokemon(data);
            } catch (error) {
                setPokemon(null);
                return <div>Couldn't load pokemon, try again later!</div>;
            }
        }
        // if (pokemonList) {
        //     setPokemon(null);
        // }
        // try{
        //     const data = await fetchPokemonType(Type);
        //     if(data.length !== 0)
        //         setPokemon(data);
        // } catch (error) {
        //     setPokemon(null);
        //     return <div>Couldn't load pokemon, try again later!</div>;
        // }
    };

    return (
        <div>
            <section className="flex flex-col items-center gap-4">
                <div className="flex flex-wrap gap-4 justify-center">
                    <TypeBtn type="normal" onClick={handlePokemonBtnClick} isActive={activeType === "normal"}/>
                    <TypeBtn type="fire" onClick={handlePokemonBtnClick} isActive={activeType === "fire"}/>
                    <TypeBtn type="water" onClick={handlePokemonBtnClick} isActive={activeType === "water"}/>
                    <TypeBtn type="electric" onClick={handlePokemonBtnClick} isActive={activeType === "electric"}/>
                    <TypeBtn type="grass" onClick={handlePokemonBtnClick} isActive={activeType === "grass"}/>
                    <TypeBtn type="ice" onClick={handlePokemonBtnClick} isActive={activeType === "ice"}/>
                    <TypeBtn type="fighting" onClick={handlePokemonBtnClick} isActive={activeType === "fighting"}/>
                    <TypeBtn type="poison" onClick={handlePokemonBtnClick} isActive={activeType === "poison"}/>
                    <TypeBtn type="ground" onClick={handlePokemonBtnClick} isActive={activeType === "ground"}/>
                </div>
                <div className="flex flex-wrap gap-4 justify-center">
                    <TypeBtn type="flying" onClick={handlePokemonBtnClick} isActive={activeType === "flying"}/>
                    <TypeBtn type="psychic" onClick={handlePokemonBtnClick} isActive={activeType === "psychic"}/>
                    <TypeBtn type="bug" onClick={handlePokemonBtnClick} isActive={activeType === "bug"}/>
                    <TypeBtn type="rock" onClick={handlePokemonBtnClick} isActive={activeType === "rock"}/>
                    <TypeBtn type="ghost" onClick={handlePokemonBtnClick} isActive={activeType === "ghost"}/>
                    <TypeBtn type="dragon" onClick={handlePokemonBtnClick} isActive={activeType === "dragon"}/>
                    <TypeBtn type="steel" onClick={handlePokemonBtnClick} isActive={activeType === "steel"}/>
                    <TypeBtn type="dark" onClick={handlePokemonBtnClick} isActive={activeType === "dark"}/>
                    <TypeBtn type="fairy" onClick={handlePokemonBtnClick} isActive={activeType === "fairy"}/>
                </div>
            </section>
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