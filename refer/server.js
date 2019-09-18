const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const typeDefs = gql(`
  type Query {
    quoteOfTheDay: String
    random: Float!
    rollThreeDice: [Int]
  }
`);

const resolvers = {
  Query: {
    quoteOfTheDay: () => {
      return Math.random() < 0.5 ? 'Take it easy' : 'Salvation lies within';
    },
    random: () => {
      return Math.random();
    },
    rollThreeDice: () => {
      return [1, 2, 3].map(_ => 1 + Math.floor(Math.random() * 6));
    },
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);