export interface Pokemon {
  node: {
    id: string;
    name: string;
    classification: string;
    types: string[];
  };
}

export interface PokemonRow {
  id: string;
  name: string;
  classification: string;
  types: string;
}

export const PokemonType = {
  grass: "grass",
  poison: "poison",
  fire: "fire",
  flying: "flying",
  water: "water",
  bug: "flying"
} as const;

export type PokemonType = typeof PokemonType[keyof typeof PokemonType];
