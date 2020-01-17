import React, { useState } from "react";
import "./App.css";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { Row, Col, Spin } from "antd";
import { PokemonType } from "./type";
import {
  SearchInput,
  PokemonTable,
  RadioPokemonType,
  NoPokemonFound
} from "./component/";

const GET_POKEMON = gql`
  query($type: String, $query: String) {
    pokemons(type: $type, q: $query) {
      edges {
        node {
          id
          classification
          name
          types
        }
      }
    }
  }
`;

const App: React.FC = () => {
  const [type, setType] = useState<PokemonType | undefined>();
  const [query, setQuery] = useState<string | undefined>();

  const { loading, error, data } = useQuery(GET_POKEMON, {
    variables: {
      $type: type,
      $query: (query || "").toString()
    }
  });

  console.log({
    type,
    query,
    loading,
    error,
    data
  });

  return (
    <div className="App">
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <SearchInput
            value={query}
            set={setQuery}
            placeholder="Search by name"
          />
          <RadioPokemonType query={type} setQuery={setType} />
        </Col>
        <Col span={16}>
          {loading ? (
            <Row type="flex" justify="center">
              <Spin size="large" />
            </Row>
          ) : data.pokemons ? (
            <PokemonTable data={data.pokemons.edges} />
          ) : (
            <NoPokemonFound />
          )}
        </Col>
      </Row>
    </div>
  );
};

export default App;
