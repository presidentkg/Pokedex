import PokemonCard from "@/components/PokemonCard";
import { fetchRandomPokemon } from "@/lib/data/randomPokemons";
import { PokemonData } from "@/lib/interfaces";

export default async function RandomPokemons({ numberOfPokemonToFetch }: { numberOfPokemonToFetch: number }) {
    let pokemonList: PokemonData[] = [];
    try {
        pokemonList = await fetchRandomPokemon(numberOfPokemonToFetch);
    } catch (error) {
        return <div>Kunde inte ladda Pokémon. Var god försök igen senare.</div>;
    }
  return (
    <div className="mt-8 grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-4 gap-8">
    {pokemonList.map((pokemon) => (
        <PokemonCard key={pokemon.id} {...pokemon} />
    ))}
    </div>
  );
}