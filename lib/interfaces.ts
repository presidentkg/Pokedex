export interface Pokemon{
  name: string;
  url: string;
}

export interface PokemonData {
  name: string;
  id: number;
  image: string | null;
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

export interface PokemonApiResponse {
  id: number;
  name: string;
  sprites: {
    other: {
      "official-artwork": {
        front_default: string | null;
      };
    };
  };
  types: {
    type: {
      name: string;
    };
  }[];
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
}
