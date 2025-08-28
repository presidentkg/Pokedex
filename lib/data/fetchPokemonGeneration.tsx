import { Pokemon, PokemonData, PokemonStat, PokemonType } from "../interfaces";

export const fetchPokemonGeneration = async (
  generation: number,
): Promise<PokemonData[]> => {
    const response = await fetch(`https://pokeapi.co/api/v2/generation/${generation}/`);
    if (!response.ok) {
        throw new Error(`Couldn't load generation ${generation}s Pokemon`);
    }
    const generationData = await response.json();
    const generationPokemons = generationData.pokemon_species;
    const fetchPromises = generationPokemons.map((pokemon: Pokemon) =>
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}/`).then((res) => {
            if (!res.ok) {
                return null;
        }
        return res.json();
        }),
    );
    const pokemonData = await Promise.all(fetchPromises);
    const transformedPokemons: PokemonData[] = pokemonData.filter(
    (pokemon) => pokemon !== null && pokemon !== undefined).map((pokemon) => ({
        name: pokemon.name,
        id: pokemon.id,
        image: pokemon.sprites.other["official-artwork"].front_default || null,
        types: pokemon.types.map((typeObj: PokemonType) => typeObj.type.name),
        hp: pokemon.stats.find((statObj: PokemonStat) => statObj.stat.name === 'hp')?.base_stat || 0,
        attack: pokemon.stats.find((statObj: PokemonStat) => statObj.stat.name === 'attack')?.base_stat || 0,
        defense: pokemon.stats.find((statObj: PokemonStat) => statObj.stat.name === 'defense')?.base_stat || 0,
    }));
    transformedPokemons.sort((a, b) => a.id - b.id);
    return transformedPokemons
};