const axios = require("axios");

// axios.post("http://localhost:3000/product", {
//     userId: "whatever",
//     productId: "whatever",
//   })
//   .then(function (response) {
//     console.log(response.data);
//     // Should be pct and value_in_cents
//   })
//   .catch(function (error) {
//     console.log(error);
//   }); 

// axios.get("http://localhost:3000/product/whatever/whatever")
//  .then(function (response) {
//    console.log(response);
//    // Should be pct and value_in_cents
//  })
//  .catch(function (error) {
//    console.log(error);
//  });

// axios.get("http://localhost:3000/products", { headers: { "X-USER-ID": "b65867d747e1bb1fcfe5" } })
//   .then(function (response) {
//     console.log(response.data);
//     // Should be pct and value_in_cents
//   })
//   .catch(function (error) {
//     console.log(error);
//   });

const moment = require("moment");

const random = require('crypto').randomBytes(10).toString('hex');

const today = moment(new Date()).format("YYYY-MM-DD");
// const graphqlServer = "http://localhost:4000/graphql";

// const userMutation = `mutation {
//   createUser(input: {
//       id: "${random}"
//       first_name: "${random}"
//       last_name: "${random}"
//       date_of_birth: "${today}"
//     })
//   }
// `

// axios
//   .post(graphqlServer, {
//     "query": userMutation,
//   }).then(response => console.log(response)).catch()

const graphqlServer = "http://localhost:4000/graphql";

axios.post(graphqlServer, {"query":"{\n  getUsers {\n    id\n  }\n}"})
  .then(response => console.log(response))
  .catch(e => console.log(e));


// axios.get("http://localhost:3000/product", { headers: { "X-USER-ID": "test" } })
//   .then(function (response) {
//     console.log(response);
//     // Should be pct and value_in_cents
//   })
//   .catch(function (error) {
//     console.log(error);
//   });
