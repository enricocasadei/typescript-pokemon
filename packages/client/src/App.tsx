import React, { useState } from "react";
import "./App.css";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { Row, Col, Spin, Button } from "antd";
import { PokemonType } from "./type";
import {
  SearchInput,
  PokemonTable,
  RadioPokemonType,
  NoPokemonFound,
  Header
} from "./component/";

const App: React.FC = () => {
  const [type, setType] = useState<PokemonType | undefined>();
  const [query, setQuery] = useState<string | undefined>("");

  const GET_POKEMON = gql`
  query{
    pokemons(type: "${(type || "").toString()}", q: "${query}") {
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

  const { loading, error, data } = useQuery(GET_POKEMON);

  return (
    <>
      <Header />
      <div className="App">
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Row className="margin-bottom-medium">
              <SearchInput
                value={query}
                set={setQuery}
                placeholder="Search by name"
              />
            </Row>
            <Row className="margin-bottom-medium">
              <RadioPokemonType query={type} setQuery={setType} />
            </Row>
            <Row className="margin-bottom-medium">
              <Button
                icon="undo"
                onClick={() => {
                  setQuery("");
                  setType(undefined);
                }}
              >
                Reset Filters
              </Button>
            </Row>
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
    </>
  );
};

export default App;
