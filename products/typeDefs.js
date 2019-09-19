const { gql } = require('apollo-server-express');

const product = `
  input DiscountInput {
    pct: Float
    value_in_cents: Int
  }

  input ProductInput {
    price_in_cents: Int
    title: String
    description: String
    discount: DiscountInput
  }

  type Discount {
    pct: Float
    value_in_cents: Int
  }

  type Product {
    id: ID!
    price_in_cents: Int
    title: String
    description: String
    discount: Discount
  }

  type Query {
    getProduct(id: ID!): Product
  }

  type Mutation {
    createProduct(input: ProductInput): String
    updateProduct(id: ID!, input: ProductInput): Product
    deleteProduct(id: ID!): String
  }
`

const typeDefs = gql(product);

module.exports = {
  typeDefs,
}