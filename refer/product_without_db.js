const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

// https://stackoverflow.com/questions/45806368/graphql-error-field-type-must-be-input-type-but-got?rq=1

// type and input is incompatile so should make differentt name?
const typeDefs = gql(`
  input DescountInput {
    pct: Float
    value_in_cents: Int
  }

  input ProductInput {
    price_in_cents: Int
    title: String
    description: String
    descount: DescountInput
  }

  type Descount {
    pct: Float
    value_in_cents: Int
  }

  type Product {
    id: ID!
    price_in_cents: Int
    title: String
    description: String
    descount: Descount
  }

  type Query {
    getProduct(id: ID!): Product
  }

  type Mutation {
    createProduct(input: ProductInput): Product
    updateProduct(id: ID!, input: ProductInput): Product
    deleteProduct(id: ID!): Product
  }
`);

class Product {
  constructor(id, { price_in_cents, title, description, discount }) {
    this.id = id;
    this.price_in_cents = price_in_cents;
    this.title = title;
    this.description = description;
    this.discount = discount
  }
}

const fakeDatabase = {};

const resolvers = {
  Query: {
    getProduct: (parent, { id }) => {
      if (!fakeDatabase[id]) {
        throw new Error('no Product exists with id ' + id);
      }
      return new Product(id, fakeDatabase[id]);
    },
  },
  Mutation: {
    createProduct: (parent, { input }) => {
      // Create a random id for our "database".
      var id = require('crypto').randomBytes(10).toString('hex');

      fakeDatabase[id] = input;
      return new Product(id, input);
    },
    updateProduct: (parent, { id, input }) => {
      if (!fakeDatabase[id]) {
        throw new Error('no Product exists with id ' + id);
      }
      // This replaces all old data, but some apps might want partial update.
      fakeDatabase[id] = input;
      return new Product(id, input);
    },
    deleteProduct: (parent, { id }) => {
      if (!fakeDatabase[id]) {
        throw new Error('no Product exists with id ' + id);
      }
      const deletedProduct = new Product(id, fakeDatabase[id])
      delete fakeDatabase[id]
      return deletedProduct;
    },
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);

