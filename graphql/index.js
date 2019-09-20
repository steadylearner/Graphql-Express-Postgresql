const { startServer } = require("./server");
const { typeDefs, resolvers } = require("./schema");

startServer(typeDefs, resolvers);

