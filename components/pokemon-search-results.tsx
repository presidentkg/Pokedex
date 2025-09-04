import PokemonCard from "@/components/pokemon-card";
import PaginationNav from "@/components/nav-pagination";
import { fetchPokemon } from "@/lib/data/fetch-pokemon";
import { Pokemon, PokemonData} from "@/lib/interfaces";

const POKEMON_PER_PAGE = 16;
const POKEMON_FETCH_LIMIT = 1000;

export default async function PokemonSearchResults({ query, currentPage }: { query: string; currentPage: number }) {
    const offset = (currentPage - 1) * POKEMON_PER_PAGE;
    let matchingPokemonData: PokemonData[] = [];
    let pokemonCount = 0;

    try {
        if (query !== "") {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${POKEMON_FETCH_LIMIT}`);
            const { results } : { results: Pokemon[] } = await response.json();
            const allMatchingPokemons = results.filter((pokemon) => pokemon.name.includes(query.toLowerCase()));
            pokemonCount = allMatchingPokemons.length;
            const paginatedPokemons = allMatchingPokemons.slice(offset, offset + POKEMON_PER_PAGE);
            matchingPokemonData = await fetchPokemon(paginatedPokemons);
        }
    } catch (_error) {
        return <div>Couldn&apos;t load pokemon, try again later</div>;
    }

    return (
        <>
        <div className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-4 gap-8 mt-8">
            {matchingPokemonData.length > 0 ? (
                matchingPokemonData.map((pokemon) => (
                <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))
            ) : (
                query !== "" && <p>No Pokémon found for your search.</p>
            )}
        </div>
        {query !== "" && (
            <PaginationNav page={currentPage} totalPages={Math.ceil(pokemonCount / POKEMON_PER_PAGE)} query={query} />
        )}
        </>
    );
}