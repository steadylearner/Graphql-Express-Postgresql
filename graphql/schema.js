// https://blog.apollographql.com/modularizing-your-graphql-schema-code-d7f71d5ed5f2 

const { startServer } = require("./server")
const { product, user } = require("./typeDefs")
const { productResolvers, userResolvers } = require("./resolvers")

// const schema = makeExecutableSchema({
const typeDefs = [ product, user ];
const resolvers =  [ productResolvers, userResolvers ];

// const { merge } = require("lodash");
// const resolvers =  merge(productResolvers, userResolvers);

module.exports = {
  typeDefs,
  resolvers,
}
