const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const typeDefs = gql(`
  input MessageInput {
    content: String
    author: String
  }

  type Message {
    id: ID!
    content: String
    author: String
  }

  type Query {
    getMessage(id: ID!): Message
  }

  type Mutation {
    createMessage(input: MessageInput): Message
    updateMessage(id: ID!, input: MessageInput): Message
  }
`);

class Message {
    constructor(id, { content, author }) {
        this.id = id;
        this.content = content;
        this.author = author;
    }
}

const fakeDatabase = {};

const resolvers = {
    Query: {
        getMessage: (parent, { id }) => {
            if (!fakeDatabase[id]) {
                throw new Error('no message exists with id ' + id);
            }
            return new Message(id, fakeDatabase[id]);
        },
    },
    Mutation: {
        createMessage: (parent, { input }) => {
            // Create a random id for our "database".
            var id = require('crypto').randomBytes(10).toString('hex');

            fakeDatabase[id] = input;
            return new Message(id, input);
        },
        updateMessage: (parent, { id, input }) => {
            if (!fakeDatabase[id]) {
                throw new Error('no message exists with id ' + id);
            }
            // This replaces all old data, but some apps might want partial update.
            fakeDatabase[id] = input;
            return new Message(id, input);
        },
    }
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);

// mutation {
//     createMessage(input: {
//         author: "bad",
//         content: "hope",
//     }) {
//         id
//         content
//         author
//     }
// }