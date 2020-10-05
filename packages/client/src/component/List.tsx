import { Row, Col, Spin } from 'antd';
import React from 'react';
import { ApolloError } from '@apollo/client/errors';
import { ErrorAlert } from './ErrorAlert';
import { NoPokemonFound } from './NoPokemonFound';
import { PokemonTable } from './PokemonTable';
import { PokemonTableInfo } from '../type';

type PokemonListProps = {
  error: ApolloError | undefined;
  loading: boolean;
  data?: PokemonTableInfo;
};

export default function PokemonList({ error, loading, data }: PokemonListProps) {
  if (error) {
    return <ErrorAlert />;
  }
  return (
    <>
      {data && data.pokemons && data.pokemons.edges.length > 0 ? (
        <PokemonTable loading={loading} data={data.pokemons.edges} />
      ) : (
        <NoPokemonFound />
      )}
    </>
  );
}
