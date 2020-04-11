const { ApolloServer } = require('apollo-server-express')
const express = require('express');
const gqlSetup = require('./graphql')

const server = new ApolloServer(gqlSetup)

const app = express();
server.applyMiddleware({ app, path: '/entertainme' });


app.listen({ port: 3000 }, () =>
  console.log(`🚀 Server ready at http://localhost:3000${server.graphqlPath}`)
);
