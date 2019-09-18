const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

// const { GraphQLScalarType } = require('graphql');
// const { Kind } = require('graphql/language');

const typeDefs = gql(`
  input UserInput {
    first_name: String
    last_name: String
    date_of_birth: String
  }

  type User {
    id: ID!
    first_name: String
    last_name: String
    date_of_birth: String
  }

  type Query {
    getUser(id: ID!): User
  }

  type Mutation {
    createUser(input: UserInput): User
    updateUser(id: ID!, input: UserInput): User
    deleteUser(id: ID!): User
  }
`);

class User {
  constructor(id, { first_name, last_name, date_of_birth }) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.date_of_birth = date_of_birth;
  }
}

const fakeDatabase = {};

const resolvers = {
  Query: {
    // https://node-postgres.com/guides/async-express
    // getUser: async (parent, { id }) => {
    //   if (!fakeDatabase[id]) {
    //     throw new Error('no User exists with id ' + id);
    //   }
    //   const rows = await db.query('SELECT * FROM users WHERE id = $1', [id])
    //   const payload = rows[0]
    //   return new User(id, payload);
    // },
    getUser: (parent, { id }) => {
      if (!fakeDatabase[id]) {
        throw new Error('no User exists with id ' + id);
      }
      return new User(id, fakeDatabase[id]);
    },
  },
  Mutation: {
    createUser: (parent, { input }) => {
      // Create a random id for our "database".
      var id = require('crypto').randomBytes(10).toString('hex');

      fakeDatabase[id] = input;
      return new User(id, input);
    },
    updateUser: (parent, { id, input }) => {
      if (!fakeDatabase[id]) {
        throw new Error('no User exists with id ' + id);
      }
      // This replaces all old data, but some apps might want partial update.
      fakeDatabase[id] = input;
      return new User(id, input);
    },
    deleteUser: (parent, { id }) => {
      if (!fakeDatabase[id]) {
        throw new Error('no User exists with id ' + id);
      }
      const deletedUser = new User(id, fakeDatabase[id])
      delete fakeDatabase[id]
      return deletedUser;
    },
  },
  // https://www.apollographql.com/docs/graphql-tools/scalars/#custom-scalar-examples
  // Date: new GraphQLScalarType({
  //     name: 'Date',
  //     description: 'Date custom scalar type',
  //     parseValue(value) {
  //       return new Date(value); // value from the client
  //     },
  //     serialize(value) {
  //       return value.getTime(); // value sent to the client
  //     },
  //     parseLiteral(ast) {
  //       if (ast.kind === Kind.INT) {
  //         return new Date(ast.value) // ast value is always in string format
  //       }
  //       return null;
  //     },
  //   }),
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
