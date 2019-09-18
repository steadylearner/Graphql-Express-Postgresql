const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const typeDefs = gql(`
  type RandomDie {
    numSides: Int!
    rollOnce: Int!
    roll(numRolls: Int!): [Int]
  }

  type Query {
    getDie(numSides: Int): RandomDie
  }
`);

// This class implements the RandomDie GraphQL type
class RandomDie {
    constructor(numSides) {
        this.numSides = numSides;
    }

    rollOnce() {
        return 1 + Math.floor(Math.random() * this.numSides);
    }

    roll({ numRolls }) {
        var output = [];
        for (var i = 0; i < numRolls; i++) {
            output.push(this.rollOnce());
        }
        return output;
    }
}

// The root provides the top-level API endpoints
const resolvers = {
    Query: {
        getDie: (parent, { numSides }) => {
            return new RandomDie(numSides || 6);
        }
    }
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);



// {
//     getDie(numSides: 6) {
//         rollOnce
//         roll(numRolls: 3)
//     }
// } 