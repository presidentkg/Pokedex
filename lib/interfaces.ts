export interface Pokemon{
  name: string;
  url: string;
}

export interface PokemonData {
  name: string;
  id: number;
  image: string;
  types: string[];
  hp: number;
  attack: number;
  defense: number;
}

export interface PokemonType {
  slot: number;
  type: {
      name: string;
      url: string;
  };
}

export interface PokemonStat {
  base_stat: number;
  stat: {
    name: string;
  };
}
