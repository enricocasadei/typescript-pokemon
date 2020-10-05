import { useQuery } from '@apollo/client';
import { Row, Col, Button, PageHeader } from 'antd';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import { Filters, PokemonTableInfo, PokemonType } from '../type';
import PokemonList from './List';
import { CheckboxPokemonType } from './CheckboxPokemonType';
import { SearchInput } from './SearchInput';

export default function ListController() {
  const [filter, setFilter] = useState<Filters>({ ...emptyFilter });

  const GET_POKEMON = gql`
    query pokemons($lastId: ID, $query: String, $type: [String]) {
      pokemons(type: $type, q: $query, after: $lastId) {
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

  const { loading, error, data } = useQuery<PokemonTableInfo>(GET_POKEMON, {
    variables: { ...filter },
  });

  return (
    <>
      <PageHeader title="Pokemon List" />
      <Row gutter={[16, 16]}>
        <Col xs={{ span: 24 }} md={{ span: 4 }}>
          <Row className="margin-bottom-medium">
            <SearchInput
              value={filter.query}
              set={(q?: string) => setFilter({ ...filter, query: q || '' })}
              placeholder="Search by name"
            />
          </Row>
          <Row className="margin-bottom-medium">
            <CheckboxPokemonType
              query={filter.type}
              setQuery={(q: PokemonType[]) => setFilter({ ...filter, type: q })}
            />
          </Row>
          <Row className="margin-bottom-medium">
            <Button icon="undo" onClick={() => setFilter({ ...emptyFilter })}>
              Reset Filters
            </Button>
          </Row>
        </Col>
        <Col xs={{ span: 24 }} md={{ span: 20 }}>
          <PokemonList
            error={error}
            loading={loading}
            data={data}
            hasNextPage={data?.pokemons.pageInfo.hasNextPage || false}
            setLastId={(q: string) => setFilter({ ...filter, query: q })}
          />
        </Col>
      </Row>
    </>
  );
}

const emptyFilter = {
  type: [],
  query: '',
  lastId: '',
};
