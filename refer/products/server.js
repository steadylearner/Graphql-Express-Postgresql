const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const chalk = require("chalk");

const startServer = (typeDefs, resolvers) => {
    const server = new ApolloServer({ typeDefs, resolvers });
    const port = 5000

    const app = express();
    server.applyMiddleware({ app });

    const blue = chalk.blue
    const target = blue(`http://localhost:${port}${server.graphqlPath}`)

    app.listen({ port }, () =>
        console.log(`🚀 Server ready at ${target}`)
    );
}

module.exports = {
    startServer,
}