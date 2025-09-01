import { Pokemon, PokemonData, PokemonStat, PokemonType } from "../interfaces";

export async function fetchPokemon(
  list: Pokemon[]
): Promise<PokemonData[]> {
    const fetchPromises = list.map((item) => fetch(item.url));

    try {
        const responses = await Promise.all(fetchPromises);
        if (responses.some((res) => !res.ok))
            throw new Error("One or more requests failed");
        const pokemonData = await Promise.all(responses.map((res) => res.json()));
        const transformedPokemons: PokemonData[] = pokemonData.map((pokemon) => ({
            name: pokemon.name,
            id: pokemon.id,
            image: pokemon.sprites.other["official-artwork"].front_default || null,
            types: pokemon.types.map((typeObj: PokemonType) => typeObj.type.name),
            hp: pokemon.stats.find((statObj: PokemonStat) => statObj.stat.name === 'hp')?.base_stat || 0,
            attack: pokemon.stats.find((statObj: PokemonStat) => statObj.stat.name === 'attack')?.base_stat || 0,
            defense: pokemon.stats.find((statObj: PokemonStat) => statObj.stat.name === 'defense')?.base_stat || 0,
        }));
        transformedPokemons.sort((a, b) => a.id - b.id);
        return transformedPokemons;
    } catch (e) {
        return [];
    }
}