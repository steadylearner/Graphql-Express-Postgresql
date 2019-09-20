const { gql } = require('apollo-server-express');

// Should use extend to make the merge process to work
// https://stackoverflow.com/questions/48917863/how-do-you-extend-types-in-graphql
let user = `
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

  extend type Query {
    getUser(id: ID!): User
  }

  extend type Mutation {
    createUser(input: UserInput): String
    updateUser(id: ID!, input: UserInput): User
    deleteUser(id: ID!): String
  }
`

// extend solves the problem of 
// Error: There can be only one type named "Query".
// There can be only one type named "Mutation".

user = gql(user);

module.exports = user;
