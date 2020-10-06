import gql from 'graphql-tag';

export const GET_POKEMON = gql`
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
    }
  }
`;
