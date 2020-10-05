import { Row, Col, Spin } from 'antd';
import React from 'react';
import { ApolloError } from '@apollo/client/errors';
import { ErrorAlert } from './ErrorAlert';
import { NoPokemonFound } from './NoPokemonFound';
import { PokemonTable } from './PokemonTable';

type PokemonListProps = {
  error: ApolloError | undefined;
  loading: boolean;
  data: any;
  hasNextPage: boolean;
  setLastId: (id: string) => void;
};

export default function PokemonList({ error, loading, data, hasNextPage, setLastId }: PokemonListProps) {
  if (error) {
    return <ErrorAlert />;
  }

  if (loading) {
    return (
      <Row justify="center">
        <Spin size="large" />
      </Row>
    );
  }
  return (
    <>
      {data && data.pokemons && data.pokemons.edges.length > 0 ? (
        <PokemonTable
          data={data.pokemons.edges}
          hasNextPage={hasNextPage}
          getLastId={(value: string) => setLastId(value)}
        />
      ) : (
        <NoPokemonFound />
      )}
    </>
  );
}
