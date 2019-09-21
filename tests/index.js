// https://github.com/steadylearner/JavaScript-Full-Stack/blob/master/Express/src/test/index.js
// https://www.google.com/search?client=firefox-b-d&q=jest+with+supertest+example

// If files becomes larget, consider using jest instead

const test = require("tape");
const supertest = require("supertest");

const app = require("../server");
const request = supertest(app);

const assert = require('assert')

const chalk = require("chalk");

const moment = require("moment");
const axios = require("axios");

// Functional Test(End to End) here because what we want to verify is request and response only
// This is faster than jest and you don't need async and await

test("GET /product with X-USER-ID header", done => {
    request
        .get('/product')
        .set("X-USER-ID", "test")
        .expect(200)
        .then(response => {
            // console.log(response.body);
            const blue = chalk.blue
            const msg = blue("Should return 200 OK with 'test'");

            try {
                assert.equal(response.body.userId, "test");
            } catch (e) {
                console.log(e);
                done.fail(msg);
            }

            done.pass(msg);
            done.end();
        })
});

test("GET /product without X-USER-ID header", done => {
    request
        .get('/product')
        .expect(200)
        .then(response => {
            // console.log(response.text);
            const blue = chalk.blue
            const msg = blue("Should return 200 OK with 'There is no X-USER-ID header in this request.'");

            try {
                assert.equal(response.text, "There is no X-USER-ID header in this request.");
            } catch (e) {
                console.log(e);
                done.fail(msg);
            }

            done.pass(msg);
            done.end();
        })
});

test("GET /products with X-USER-ID header and today is his birthday.", async done => {
    const random = require('crypto').randomBytes(10).toString('hex');

    const today = moment(new Date()).format("YYYY-MM-DD");
    const graphqlServer = "http://localhost:4000/graphql";

    const userMutation = `mutation {
        createUser(input: {
                id: "${random}"
                first_name: "${random}"
                last_name: "${random}"
                date_of_birth: "${today}"
            })
        }
    `

    try {
        const response = await axios
            .post(graphqlServer, {
                "query": userMutation,
            });
        // console.log(response);
    } catch (e) {
        console.log(e);
        done.fail("Fail with graphql server tocreate user with birhtday");
    }

    request
        .get('/products')
        .set("X-USER-ID", random)
        .expect(200)
        .then(response => {
            // console.log(response.body);
            const blue = chalk.blue
            const msg = blue("Should return 200 OK");

            try {
                // assert.equal(response.body.userId, "test");
                console.log(response.body.payload);
            } catch (e) {
                console.log(e);
                done.fail(msg);
            }

            done.pass(msg);
            done.end();
        })
});

test("GET /products with X-USER-ID header and today is not birthday", async done => {
    const random = require('crypto').randomBytes(10).toString('hex');
    const yesterday = moment(new Date()).add(-1, "days").format("YYYY-MM-DD");

    const graphqlServer = "http://localhost:4000/graphql";

    const userMutation = `mutation {
        createUser(input: {
                id: "${random}"
                first_name: "${random}"
                last_name: "${random}"
                date_of_birth: "${yesterday}"
            })
        }
    `

    try {
        const response = await axios
            .post(graphqlServer, {
                "query": userMutation,
            });
        // console.log(response);
    } catch (e) {
        console.log(e);
        done.fail("Fail with graphql server to create user with not birhtday");
    }

    request
        .get('/products')
        .set("X-USER-ID", random)
        .expect(200)
        .then(response => {
            // console.log(response.body);
            const blue = chalk.blue
            const msg = blue("Should return 200 OK");

            try {
                // assert.equal(response.body.userId, "test");
                console.log(response.body.payload);
            } catch (e) {
                console.log(e);
                done.fail(msg);
            }

            done.pass(msg);
            done.end();
        })
});

test("GET /products without X-USER-ID", done => {
    request
        .get('/products')
        .expect(200)
        .then(response => {
            // console.log(response.body);
            const blue = chalk.blue
            const msg = blue("Should return 200 OK");

            try {
                // assert.equal(response.body.userId, "test");
                console.log(response.body.payload);
            } catch (e) {
                console.log(e);
                done.fail(msg);
            }

            done.pass(msg);
            done.end();
        })
});

