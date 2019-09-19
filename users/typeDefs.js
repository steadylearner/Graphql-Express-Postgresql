const user = `
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
`

module.exports = {
  user,
}