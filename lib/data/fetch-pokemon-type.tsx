import { Pokemon, PokemonData, PokemonStat, PokemonType } from "../interfaces";

export const fetchPokemonType = async (
  type: string,
): Promise<PokemonData[]> => {
    const response = await fetch(`https://pokeapi.co/api/v2/type/${type}/`);
    if (!response.ok) {
        throw new Error(`Couldn't load ${type} Pokemon`);
    }
    const typeData = await response.json();
    const typePokemons = typeData.pokemon;
    const fetchPromises = typePokemons.map((item: { pokemon: Pokemon }) =>
        fetch(`https://pokeapi.co/api/v2/pokemon/${item.pokemon.name}/`).then((res) => {
            if (!res.ok) {
                return null;
        }
        return res.json();
        }),
    );
    const pokemonData = await Promise.all(fetchPromises);
    const transformedPokemons: PokemonData[] = pokemonData.filter(
    (pokemon) => pokemon !== null && pokemon !== undefined && pokemon.id < 1001).map((pokemon) => ({
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