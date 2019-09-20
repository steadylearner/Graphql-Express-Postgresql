require('dotenv').config()

const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
// const db = require('./db')

const { Client } = require("pg");

const PRODUCTS = process.env.PRODUCTS;
const client = new Client(PRODUCTS);
client.connect();

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
    createUser(input: UserInput): String
    updateUser(id: ID!, input: UserInput): User
    deleteUser(id: ID!): String
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

// https://node-postgres.com/guides/async-express
const resolvers = {
  Query: {
    getUser: async (parent, { id }) => {
      const sql = 'SELECT * FROM users WHERE id = $1';
      const query = {
        text: sql,
        values: [id],
      };

      try {
        const { rows } = await client.query(query);
        const payload = rows[0]
        console.log(payload)
        return new User(id, payload);
      } catch (e) {
        console.log(e);
      }
    },
  },
  Mutation: {
    createUser: async (parent, { input }) => {
      // Create a random id for our "database".
      const id = require('crypto').randomBytes(10).toString('hex');
      const sql = "INSERT INTO users(id, first_name, last_name, date_of_birth) VALUES($1, $2, $3, $4)";

      const { first_name, last_name, date_of_birth, } = input;
      const query = {
        text: sql,
        values: [id, first_name, last_name, date_of_birth],
      };

      try {
        const { rowCount } = await client.query(query);
        return `${rowCount} user with ${id} was created.`;
      } catch(e) {
        console.log(e);
      }
    },
    updateUser: async (parent, { id, input }) => {
      const sql = "UPDATE users SET first_name = $1, last_name = $2, date_of_birth = $3 WHERE id = $4"
      const { first_name, last_name, date_of_birth } = input;
      const query = {
        text: sql,
        values: [first_name, last_name, date_of_birth, id],
      };

      try {
        const { rowCount } = await client.query(query);
        console.log(`update ${rowCount} user with id(${id}).`);
        return new User(id, input);
      } catch (e) {
        console.log(e);
      }
    },
    deleteUser: async (parent, { id }) => {
      const sql = 'DELETE FROM users WHERE id = $1';
      const query = {
        text: sql,
        values: [id],
      };

      try {
        const { rowCount } = await client.query(query);
        return `${rowCount} user with ${id} was removed.`;
      } catch (e) {
        console.log(e);
      }
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

