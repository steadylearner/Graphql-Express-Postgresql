// 1. C descount.value_in_cents = price_in_cents * descount.pct

// mutation {
//     createProduct(input: {
//         price_in_cents: 1000,
//         title: "product",
//         description: "cheap"
//         descount: {
//           pct: 0.05
//           value_in_cents: 50
//         }
//     }) {
//         id
//         price_in_cents
//         title
//         description
//     }
// }

// 2. R

// {
//     getProduct(id: "bc8d0aa455296ab74755") {
//         id
//         price_in_cents
//         title
//         description
//     }
// }

// 3. U

// mutation {
//     updateProduct(id: "bc8d0aa455296ab74755", input: {
//         description: "expensive"
//     }){
//         description
//     }
// }

// 4. D

// mutation {
//     deleteProduct(id: "bc8d0aa455296ab74755"){
//         id
//         title
//     }
// }

https://github.com/hashlab/hiring/blob/master/challenges/pt-br/back-challenge.md

Product

{
    id: string
    price_in_cents: int
    title: string
    description: string
    discount: {
        pct: float
        value_in_cents: int
    }
}

User

{
    id: string
    first_name: string
    last_name: string
    date_of_birth: Date
}

var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
// should return user
// M
var schema = buildSchema(`
  type Query {
    findUser(id: String!): user
  }
`);

// The root provides a resolver function for each API endpoint
// Controler
var root = {
  findUser: function ({id}) {
    const user = db.find(id)
    return user;
  }
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');

var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    rollDice(numDice: Int!, numSides: Int): [Int]
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  rollDice: function ({numDice, numSides}) {
    var output = [];
    for (var i = 0; i < numDice; i++) {
      output.push(1 + Math.floor(Math.random() * (numSides || 6)));
    }
    return output;
  }
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');

https://node-postgres.com/features/connecting
https://medium.com/dailyjs/postgresql-with-nodejs-d0dcedba5884
https://github.com/apollographql/apollo-server/tree/master/packages/apollo-server-express