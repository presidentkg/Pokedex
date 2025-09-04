"use client";

import { useEffect, useState } from "react";
import GenerationBtn from "./generation-btn";
import { PokemonData } from "@/lib/interfaces";
import { fetchPokemonGeneration } from "@/lib/data/fetch-pokemon-generation";
import PokemonCard from "./pokemon-card";
import TypeBtn from "./type-btn";
import { fetchPokemonType } from "@/lib/data/fetch-pokemon-type";


export default function PokedexDisplays() {
    const [pagePokemon, setPagePokemon] = useState<PokemonData[] | null>(null);
    const [activeGen, setActiveGen] = useState<number | null>(null);
    const [activeType, setActiveType] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [allPokemon, setAllPokemon] = useState<PokemonData[] | null>(null);
    const [isLoading, setIsLoading] = useState<{
        status: boolean;
        gen: number | null;
        type: string | null;
    }>({ status: false, gen: null, type: null });

    const pokemonPerPage = 16;

    const setPokemonToShow = (page: number, allPokemon: PokemonData[]) => {
        const startIndex = (page - 1) * pokemonPerPage;
        const endIndex = startIndex + pokemonPerPage;
        setPagePokemon(allPokemon.slice(startIndex, endIndex));
    };

    async function updateAllPokemon(gen: number | null, type: string | null) {
        setPagePokemon(null);
        setCurrentPage(1);

        setIsLoading({status: true, gen: gen, type: type});

        if (!gen && !type) {
            setAllPokemon(null);
            setIsLoading({ status: false, gen: null, type: null });
            return;
        }

        try {
            let pokemonData: PokemonData[] = [];
            if(gen && type){
                const generationData = await fetchPokemonGeneration(gen);
                pokemonData = generationData.filter(pokemon => 
                    pokemon.types.some(t => t === type)
                );
            } else if(gen)
                pokemonData = await fetchPokemonGeneration(gen);
            else if(type)
                pokemonData = await fetchPokemonType(type);
            setAllPokemon(pokemonData);
            setPokemonToShow(currentPage, pokemonData);

        } catch (error){
            setPagePokemon(null);
        } finally {
            setIsLoading({status: false, gen: null, type: null});
        }
    }
    
    useEffect(() => {
    updateAllPokemon(activeGen, activeType);
    }, [activeGen, activeType]);

    const handleGenBtnClick = (gen: number) => {
        const newGen = gen === activeGen ? null : gen;
        setActiveGen(newGen);
    };

    const handleTypeBtnClick = (type: string) => {
        const newType = type === activeType ? null : type;
        setActiveType(newType);
    };

    const totalPages = allPokemon ? Math.ceil(allPokemon.length / pokemonPerPage) : 0;

    return (
        <div className="w-full mx-auto">
            <section className="flex flex-col items-center gap-4 bg-gradient-to-br [background-image:linear-gradient(-10deg,_#C97FE4,_#AECDF6)] p-14">
                <h1 className="text-center mt-14 text-8xl font-extrabold text-transparent bg-gradient-to-r from-purple-800 to-blue-800 [background-clip:text]">Gotta catch 'em all!</h1>
                <p className="text-center text-white text-xl">Discover, search and explore the amazing world of Pokémon. Find<br /> your favourite and learn about their stats.</p>
                <h2 className="text-4xl">Generations</h2>
                <div className="flex justify-center gap-4">
                    <GenerationBtn gen={1} onClick={handleGenBtnClick} isActive={activeGen === 1}/>
                    <GenerationBtn gen={2} onClick={handleGenBtnClick} isActive={activeGen === 2}/>
                    <GenerationBtn gen={3} onClick={handleGenBtnClick} isActive={activeGen === 3}/>
                    <GenerationBtn gen={4} onClick={handleGenBtnClick} isActive={activeGen === 4}/>
                    <GenerationBtn gen={5} onClick={handleGenBtnClick} isActive={activeGen === 5}/>
                    <GenerationBtn gen={6} onClick={handleGenBtnClick} isActive={activeGen === 6}/>
                    <GenerationBtn gen={7} onClick={handleGenBtnClick} isActive={activeGen === 7}/>
                    <GenerationBtn gen={8} onClick={handleGenBtnClick} isActive={activeGen === 8}/>
                    <GenerationBtn gen={9} onClick={handleGenBtnClick} isActive={activeGen === 9}/>
                </div>
                <h2 className="text-4xl">Types</h2>
                <div className="flex flex-wrap gap-4 justify-center">
                    <TypeBtn type="normal" onClick={handleTypeBtnClick} isActive={activeType === "normal"}/>
                    <TypeBtn type="fire" onClick={handleTypeBtnClick} isActive={activeType === "fire"}/>
                    <TypeBtn type="water" onClick={handleTypeBtnClick} isActive={activeType === "water"}/>
                    <TypeBtn type="electric" onClick={handleTypeBtnClick} isActive={activeType === "electric"}/>
                    <TypeBtn type="grass" onClick={handleTypeBtnClick} isActive={activeType === "grass"}/>
                    <TypeBtn type="ice" onClick={handleTypeBtnClick} isActive={activeType === "ice"}/>
                    <TypeBtn type="fighting" onClick={handleTypeBtnClick} isActive={activeType === "fighting"}/>
                    <TypeBtn type="poison" onClick={handleTypeBtnClick} isActive={activeType === "poison"}/>
                    <TypeBtn type="ground" onClick={handleTypeBtnClick} isActive={activeType === "ground"}/>
                </div>
                <div className="flex flex-wrap gap-4 justify-center">
                    <TypeBtn type="flying" onClick={handleTypeBtnClick} isActive={activeType === "flying"}/>
                    <TypeBtn type="psychic" onClick={handleTypeBtnClick} isActive={activeType === "psychic"}/>
                    <TypeBtn type="bug" onClick={handleTypeBtnClick} isActive={activeType === "bug"}/>
                    <TypeBtn type="rock" onClick={handleTypeBtnClick} isActive={activeType === "rock"}/>
                    <TypeBtn type="ghost" onClick={handleTypeBtnClick} isActive={activeType === "ghost"}/>
                    <TypeBtn type="dragon" onClick={handleTypeBtnClick} isActive={activeType === "dragon"}/>
                    <TypeBtn type="steel" onClick={handleTypeBtnClick} isActive={activeType === "steel"}/>
                    <TypeBtn type="dark" onClick={handleTypeBtnClick} isActive={activeType === "dark"}/>
                    <TypeBtn type="fairy" onClick={handleTypeBtnClick} isActive={activeType === "fairy"}/>
                </div>
            </section>
            <section className="flex flex-col items-center gap-4 bg-gradient-to-br [background-image:linear-gradient(-10deg,_#F4E7FA,_#FFFFFF)] p-14 min-h-screen">
                <h2 className="text-4xl">Pokédex</h2>
                {isLoading.status ? (
                    <p className="text-center text-xl text-gray-600">
                        Loading
                        {isLoading.gen ? ` gen ${isLoading.gen} ` : ""}
                        {isLoading.gen && isLoading.type ? `and ${isLoading.type} type ` : isLoading.type ? ` ${isLoading.type} type ` : ""}
                        pokémon    
                    </p>
                ) : (
                    <div className="flex flex-wrap justify-center gap-8 mt-8 w-1/2">
                        {pagePokemon && pagePokemon.length > 0 ? (
                            pagePokemon.map((pokemon) => (
                                <PokemonCard key={pokemon.id} pokemon={pokemon} />
                        ))
                        ) : (pagePokemon && pagePokemon.length === 0) ? (
                            <p className="text-center text-xl text-gray-600">No matching Pokemon</p>
                        ) : null}
                    </div>
                )}
                
                {allPokemon && allPokemon.length > pokemonPerPage && (
                    <div className="flex justify-center items-center gap-4 mt-8">
                        <button
                            className="bg-[#846ab6] text-white py-2 px-4 rounded-full disabled:bg-gray-400"
                            onClick={() => {
                                setCurrentPage(currentPage - 1);
                                setPokemonToShow(currentPage - 1, allPokemon);
                            }}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        {
                            Array.from({ length: totalPages },
                                (_, i) => (
                                    <button 
                                    key={i}
                                    className={`
                                        cursor-pointer py-2 px-4 rounded-full
                                        ${currentPage === i + 1 ? 'bg-[#846ab6] text-white' : 'text-gray-800'}`}
                                    onClick={() =>{
                                        setCurrentPage(i + 1);
                                        setPokemonToShow(i + 1, allPokemon);
                                    }}
                                    disabled={currentPage === i + 1}
                                    >
                                        {i + 1}
                                    </button>
                                ))
                        }
                        <button
                            className="bg-[#846ab6] text-white py-2 px-4 rounded-full disabled:bg-gray-400"
                            onClick={() => {
                                setCurrentPage(currentPage + 1);
                                setPokemonToShow(currentPage + 1, allPokemon);
                            }}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                )}
            </section>
        </div>
    );
}