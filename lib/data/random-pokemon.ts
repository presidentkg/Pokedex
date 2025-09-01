import { PokemonData, PokemonStat, PokemonType } from "../interfaces";

const generateRandomId = (): number => {
  return Math.floor(Math.random() * 1000) + 1
}

const fetchPokemon = async (): Promise<any> => {
  const id = generateRandomId();
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if (!response.ok)
      return fetchPokemon();
    return response.json();
  } catch (error) {
    return fetchPokemon();
  }
}

export const fetchRandomPokemon = async (
  count: number,
): Promise<PokemonData[]> => {
  const fetchPromises: Promise<any>[] = [];
  for (let i = 0; i < count; i++) {
    fetchPromises.push(fetchPokemon());
  }
  const pokemonData = await Promise.all(fetchPromises);
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
  return transformedPokemons
};
