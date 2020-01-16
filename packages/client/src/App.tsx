import React, { useState } from "react";
import "./App.css";
import SearchInput from "./SearchInput";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const App: React.FC = () => {
  const [type, setType] = useState<string>("grass");
  const [query, setQuery] = useState<string>("");

  /*   const GET_POKEMON = gql`
{
  pokemonsByType:pokemonsByType(type:"${type}"){
    edges{
      cursor
      node{
        id
        name
        types
      }
    }
  }
  pokemons:pokemons(q:"${query}"){
    edges{
      cursor
      node{
        id
        name
        types
      }
    }
  }
}
`; */

  const GET_POKEMON = gql`
    query {
      pokemons: pokemons(q: "bulbasa", type: "grass") {
        edges {
          cursor
          node {
            id
            name
            types
          }
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_POKEMON);

  console.log({ loading, error, data });

  return (
    <div className="App">
      <SearchInput value={type} set={setType} />
      <SearchInput value={query} set={setQuery} />
    </div>
  );
};

export default App;
