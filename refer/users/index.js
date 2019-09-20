// https://www.google.com/search?&q=how+to+organize+graphql+projects
const { startServer } = require("./server")
const { typeDefs } = require("./typeDefs")
const { resolvers } = require("./resolvers")

startServer(typeDefs, resolvers);

