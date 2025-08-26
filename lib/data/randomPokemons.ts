interface PokemonData {
  name: string;
  id: number;
  image: string;
  types: string[];
  hp: number;
  attack: number;
  defense: number;
}

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

  return data.map((pokemon) => ({
    name: pokemon.name,
    id: pokemon.id,
    image: pokemon.sprites.front_default,
    types: pokemon.types.map((typeObj: any) => typeObj.type.name),
    hp: pokemon.stats[0].base_stat,
    attack: pokemon.stats[1].base_stat,
    defense: pokemon.stats[2].base_stat,
  }));
};