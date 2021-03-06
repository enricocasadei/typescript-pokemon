import React from 'react';
import './App.css';
import { ApolloClient, ApolloProvider, InMemoryCache, HttpLink } from '@apollo/client';
import Main from './component/Main';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:4000',
  }),
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Main />
    </ApolloProvider>
  );
}
