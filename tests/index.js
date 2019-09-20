// https://github.com/steadylearner/JavaScript-Full-Stack/blob/master/Express/src/test/index.js

// test/index.js

// const test = require("tape"); // could be jest instead
// const request = require("supertest");

// const app = require("app"); // It works with "cross-env" and package.json
// const assert = require('assert')

// test("POST /product with JSON with userId and productId", done => {
//   request(app)
//     .post('/product')
//     .send({
//       userId: "whatever",
//       productId: "whatever",
//     })
//     .set('Content-Type', 'application/json')
//     .set('Accept', 'application/json')
//     .expect(200)
//     .then(response => {
//       console.log("Discount Percent: ", response.body.pct);
//       cosnole.log("Value in Cents: ", response.body.value_in_cents)
//       const msg = "Should return 200 OK";

//       try {
//         assert.equal(response.body.pct, "0.1");
//         assert.equal(response.body.err, null);
//         // assert.equal(response.body.token, ""); // Vou usar outro se db foi necessário
//       } catch(e) {
//         console.log(e);
//         done.fail(msg);
//       }

//       done.pass(msg);
//       done.end();
//     })
// });