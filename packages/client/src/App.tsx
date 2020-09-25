import React, { useState } from 'react';
import './App.css';
import { gql, useQuery } from '@apollo/client';
import { Row, Col, Button } from 'antd';
import { Filters, PokemonTableInfo, PokemonType } from './type';
import { ApolloClient, ApolloProvider, InMemoryCache, HttpLink } from '@apollo/client';
import PokemonList from './component/List';
import { Header } from './component/Header';
import { RadioPokemonType } from './component/RadioPokemonType';
import { SearchInput } from './component/SearchInput';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:4000',
  }),
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <MainContent />
    </ApolloProvider>
  );
}

const MainContent = () => {
  const [filter, setFilter] = useState<Filters>({ ...emptyFilter });

  const GET_POKEMON = gql`
    query pokemons($lastId: ID, $query: String, $type: String) {
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
      <Header />
      <Row gutter={[16, 16]}>
        <Col xs={{ span: 24 }} md={{ span: 8 }}>
          <Row className="margin-bottom-medium">
            <SearchInput
              value={filter.query}
              set={(q?: string) => setFilter({ ...filter, query: q || '' })}
              placeholder="Search by name"
            />
          </Row>
          <Row className="margin-bottom-medium">
            <RadioPokemonType query={filter.type} setQuery={(q?: PokemonType) => setFilter({ ...filter, type: q })} />
          </Row>
          <Row className="margin-bottom-medium">
            <Button icon="undo" onClick={() => setFilter({ ...emptyFilter })}>
              Reset Filters
            </Button>
          </Row>
        </Col>
        <PokemonList
          error={error}
          loading={loading}
          data={data}
          hasNextPage={data?.pokemons.pageInfo.hasNextPage || false}
          setLastId={(q: string) => setFilter({ ...filter, query: q })}
        />
      </Row>
    </>
  );
};

const emptyFilter = {
  type: undefined,
  query: '',
  lastId: '',
};
