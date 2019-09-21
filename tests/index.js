// https://github.com/steadylearner/JavaScript-Full-Stack/blob/master/Express/src/test/index.js
// https://www.google.com/search?client=firefox-b-d&q=jest+with+supertest+example

// If files becomes larget, consider using jest instead

const test = require("tape");
const request = require("supertest");

const app = require("../app");
const assert = require('assert')

const chalk = require("chalk");

// Functional Test(End to End) here because what we want to verify is request and response only

test("GET /product with X-USER-ID header", done => {
    request(app)
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
    request(app)
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



