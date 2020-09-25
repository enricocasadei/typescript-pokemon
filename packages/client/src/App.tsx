import React, { useState, useEffect, useMemo } from "react";
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
  Header,
  ErrorAlert,
} from "./component/";

const App: React.FC = () => {
  const [type, setType] = useState<PokemonType | undefined>();
  const [query, setQuery] = useState<string | undefined>("");
  const [lastId, setLastId] = useState<string>("");
  const [hasNextPage, setHasNextPage] = useState<boolean | undefined>(false);

  const GET_POKEMON = useMemo(
    () => gql`
  query{
    pokemons(type: "${(
      type || ""
    ).toString()}", q: "${query}", after:"${lastId}") {
      edges {
        node {
          id
          classification
          name
          types
        }
      }
      pageInfo{
        hasNextPage
      }
    }
  }
`,
    [type, query, lastId]
  );

  const { loading, error, data } = useQuery(GET_POKEMON);

  useEffect(
    () =>
      data &&
      data.pokemons &&
      setHasNextPage(data.pokemons.pageInfo.hasNextPage),
    [data]
  );

  return (
    <>
      <Header />
      <div className="App">
        <Row gutter={[16, 16]}>
          <Col xs={{ span: 24 }} md={{ span: 8 }}>
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
                  setLastId("");
                  setType(undefined);
                }}
              >
                Reset Filters
              </Button>
            </Row>
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 16 }}>
            {error ? (
              <ErrorAlert />
            ) : !data && loading ? (
              <Row justify="center">
                <Spin size="large" />
              </Row>
            ) : data.pokemons && data.pokemons.edges.length > 0 ? (
              <PokemonTable
                data={data.pokemons.edges}
                hasNextPage={hasNextPage}
                getLastId={(value: string) => setLastId(value)}
              />
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
