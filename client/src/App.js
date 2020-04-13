import React from 'react';

import { ApolloProvider } from '@apollo/react-hooks'

import './App.css';
import { client } from './services/graphql'
// import HomePage from './pages/Home'
import HomePage from './pages/HomeCached'



function App() {
  return (
    <ApolloProvider client={client}>
      <HomePage />
    </ApolloProvider>
  );
}

export default App;
