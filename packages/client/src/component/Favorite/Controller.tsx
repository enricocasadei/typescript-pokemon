import { useQuery } from '@apollo/client';
import { Row, Col, PageHeader } from 'antd';
import gql from 'graphql-tag';
import React from 'react';
import { PokemonTableInfo } from '../../type';

const GET_POKEMON = gql`
  query pokemons($query: String, $type: [String]) {
    pokemons(type: $type, q: $query) {
      edges {
        node {
          id
          classification
          name
        }
      }
    }
  }
`;

export default function FavoriteController() {
  const { loading, error, data } = useQuery<PokemonTableInfo>(GET_POKEMON);

  return (
    <>
      <PageHeader title="Pokemon List" />
      <Row style={{ width: '100%' }} gutter={[16, 16]}>
        <Col md={20}>{JSON.stringify(data)}</Col>
      </Row>
    </>
  );
}

//list of pokemon

///list of favorite
