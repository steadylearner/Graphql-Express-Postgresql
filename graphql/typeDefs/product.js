const { gql } = require('apollo-server-express');

let product = `
  input DiscountInput {
    pct: Float
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
    getProducts: [Product]
  }

  type Mutation {
    createProduct(input: ProductInput): String
    updateProduct(id: ID!, input: ProductInput): Product
    deleteProduct(id: ID!): String
    deleteProducts: String
  }
`

product = gql(product);

module.exports = product
