import PokemonCard from "@/components/pokemon-card";
import PokemonSearch from "@/components/pokemon-search";
import { fetchPokemon } from "@/lib/data/fetch-pokemon";
import { Pokemon, PokemonData} from "@/lib/interfaces";

export default async function Search({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
    const { query = "" } = await searchParams;
    let matchingPokemonData: PokemonData[] = [];
    try{
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1000");
        const {results} : { results: Pokemon[] } = await response.json();
        const matchingPokemons = results.filter((pokemon) => pokemon.name.includes(query.toLowerCase()));
        matchingPokemonData = query !== "" ? await fetchPokemon(matchingPokemons) : [];
    }catch (e) {
        return <div>Couldn't load pokemon, try again later</div>;
    }

    return(
        <div className="flex flex-col items-center gap-4 bg-gradient-to-br [background-image:linear-gradient(-10deg,_#F4E7FA,_#FFFFFF)] p-14 min-h-screen">
            <div className="w-full max-w-4xl">
                <PokemonSearch />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-4 gap-8 mt-8">
            {matchingPokemonData.length > 0 ? (
                matchingPokemonData.map((pokemon) => (
                    <PokemonCard key={pokemon.id} pokemon={pokemon} />
                ))
            ) : (
                query !== "" && <p>No Pokémon found for your search.</p>
            )}
            </div>
        </div>
    )
}