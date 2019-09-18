const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const typeDefs = gql(`
  type Query {
    rollDice(numDice: Int!, numSides: Int): [Int]
  }
`);

// https://www.apollographql.com/docs/apollo-server/data/data/#resolver-type-signature
// (parent, args, context, info)
const resolvers = {
  Query: {
    rollDice: (parent, { numDice, numSides }) => {
      var output = [];
      for (var i = 0; i < numDice; i++) {
        output.push(1 + Math.floor(Math.random() * (numSides || 6)));
      }
      return output;
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);