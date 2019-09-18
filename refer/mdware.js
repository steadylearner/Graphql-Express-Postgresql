const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const typeDefs = gql(`
  type Query {
    ip: String
  }
`);

function log(req, res, next) {
    console.log('ip:', req.ip);
    next();
}

const resolvers = {
    Query: {
        ip: (parent, args, context) => {
            return context.ip;
        }
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({
        ip: req.ip
    })
});

const app = express();
app.use(log);
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);