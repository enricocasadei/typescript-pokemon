import React, { useState, useMemo } from "react";
import "./App.css";
import { gql, useQuery } from "@apollo/client";
import { Row, Col, Button } from "antd";
import { PokemonTableInfo, PokemonType } from "./type";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink,
} from "@apollo/client";
import PokemonList from "./component/List";
import { Header } from "./component/Header";
import { RadioPokemonType } from "./component/RadioPokemonType";
import { SearchInput } from "./component/SearchInput";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "http://localhost:4000",
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

const MainContent: React.FC = () => {
  const [type, setType] = useState<PokemonType | undefined>();
  const [query, setQuery] = useState<string | undefined>("");
  const [lastId, setLastId] = useState<string>("");

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

  const { loading, error, data } = useQuery<PokemonTableInfo>(GET_POKEMON);

  return (
    <>
      <Header />
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
        <PokemonList
          error={error}
          loading={loading}
          data={data}
          hasNextPage={data?.pokemons.pageInfo.hasNextPage || false}
          setLastId={setLastId}
        />
      </Row>
    </>
  );
};
