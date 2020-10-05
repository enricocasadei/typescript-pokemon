import { useQuery } from '@apollo/client';
import { Row, Col, Button, PageHeader } from 'antd';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import { Filters, PokemonTableInfo, PokemonType } from '../type';
import PokemonList from './List';
import { CheckboxPokemonType } from './CheckboxPokemonType';
import { SearchInput } from './SearchInput';

const GET_POKEMON = gql`
  query pokemons($query: String, $type: [String]) {
    pokemons(type: $type, q: $query) {
      edges {
        node {
          id
          classification
          name
          types
        }
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`;

export default function ListController() {
  const [filter, setFilter] = useState<Filters>({ ...emptyFilter });

  const { loading, error, data } = useQuery<PokemonTableInfo>(GET_POKEMON, {
    variables: { ...filter },
  });

  return (
    <>
      <PageHeader title="Pokemon List" />
      <Row style={{ width: '100%' }} gutter={[16, 16]}>
        <Col md={4}>
          <Row gutter={[16, 16]}>
            <Col>
              <Button icon="undo" onClick={() => setFilter({ ...emptyFilter })}>
                Reset Filters
              </Button>
            </Col>

            <Col>
              <SearchInput
                value={filter.query}
                set={(q?: string) => setFilter({ ...filter, query: q || '' })}
                placeholder="Search by name"
              />
            </Col>
            <Col>
              <CheckboxPokemonType
                query={filter.type}
                setQuery={(q: PokemonType[]) => setFilter({ ...filter, type: q })}
              />
            </Col>
          </Row>
        </Col>
        <Col md={20}>
          <PokemonList error={error} loading={loading} data={data} />
        </Col>
      </Row>
    </>
  );
}

const emptyFilter = {
  type: [],
  query: '',
};
