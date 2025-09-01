import PokemonCard from "@/components/pokemon-card";
import { fetchRandomPokemon } from "@/lib/data/random-pokemon";
import { PokemonData } from "@/lib/interfaces";

export default async function randomPokemonGrid({ numberOfPokemonToFetch }: { numberOfPokemonToFetch: number }) {
    let pokemonList: PokemonData[] = [];
    try {
        pokemonList = await fetchRandomPokemon(numberOfPokemonToFetch);
    } catch (error) {
        return <div>Couldn't load pokemon, try again later!</div>;
    }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-4 gap-8 mt-8">
    {pokemonList.map((pokemon) => (
        <PokemonCard key={pokemon.id} {...pokemon} />
    ))}
    </div>
  );
}