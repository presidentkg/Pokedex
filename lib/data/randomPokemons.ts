import { PokemonData, PokemonStat, PokemonType } from "../interfaces";

const generateRandomIds = (count: number): number[] => {
  const ids = new Set<number>();
  while (ids.size < count) {
    const randomId = Math.floor(Math.random() * 151) + 1;
    ids.add(randomId);
  }
  return Array.from(ids);
};

export const fetchRandomPokemon = async (
  count: number,
): Promise<PokemonData[]> => {
  const randomIds = generateRandomIds(count);

  const fetchPromises = randomIds.map((id) =>
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((response) => {
      if (!response.ok) {
        throw new Error(`Kunde inte hämta Pokémon med ID ${id}`);
      }
      return response.json();
    }),
  );

  const data = await Promise.all(fetchPromises);
  const transformedPokemons: PokemonData[] = data.map((pokemon) => ({
              name: pokemon.name,
              id: pokemon.id,
              image: pokemon.sprites.other["official-artwork"].front_default || null,
              types: pokemon.types.map((typeObj: PokemonType) => typeObj.type.name),
              hp: pokemon.stats.find((statObj: PokemonStat) => statObj.stat.name === 'hp')?.base_stat || 0,
              attack: pokemon.stats.find((statObj: PokemonStat) => statObj.stat.name === 'attack')?.base_stat || 0,
              defense: pokemon.stats.find((statObj: PokemonStat) => statObj.stat.name === 'defense')?.base_stat || 0,
          }));

  return transformedPokemons
};