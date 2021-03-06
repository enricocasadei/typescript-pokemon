import { ColumnProps, TableProps } from 'antd/lib/table/interface';

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
  grass: 'grass',
  poison: 'poison',
  fire: 'fire',
  flying: 'flying',
  water: 'water',
  bug: 'bug',
  normal: 'normal',
  electric: 'electric',
  ground: 'ground',
  dragon: 'dragon',
  ice: 'ice',
  ghost: 'ghost',
  fairy: 'fairy',
  fighting: 'fighting',
  psychic: 'psychic',
  rock: 'rock',
} as const;

export type PokemonType = typeof PokemonType[keyof typeof PokemonType];

export type PokemonTableInfo = {
  pokemons: {
    pageInfo: {
      hasNextPage: boolean;
    };
    edges: Pokemon[];
  };
};

export type Filters = {
  type: PokemonType[];
  query: string;
};

export interface VirtualColumnProps<T> extends ColumnProps<T> {
  dataIndex: string;
  width?: number;
}

export interface VirtualTableProps<T> extends TableProps<T> {
  columns: VirtualColumnProps<T>[];
  scroll: {
    x?: string | number | boolean | undefined;
    y: number;
    scrollToFirstRowOnChange?: boolean | undefined;
  };
}
