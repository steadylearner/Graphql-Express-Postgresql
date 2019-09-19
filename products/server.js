const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const startServer = (typeDefs, resolvers) => {
    const server = new ApolloServer({ typeDefs, resolvers });
    const port = 5000

    const app = express();
    server.applyMiddleware({ app });

    app.listen({ port }, () =>
        console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
    );
}

module.exports = {
    startServer,
}