// https://zellwk.com/blog/endpoint-testing/
// https://jestjs.io/docs/en/asynchronous.html
// Jest will wait until the done callback is called before finishing the test.

const app = require('../server')
const supertest = require('supertest')
const request = supertest(app)

describe("Test express with jest and supertest", () => {
    test("GET /product with X-USER-ID header", async done => {
        const response = await request
            .get('/product')
            .set("X-USER-ID", "test")

        expect(response.status).toBe(200)
        expect(response.body.userId).toBe('test')

        done();
    });

    test("GET /product without X-USER-ID header", async done => {
        const response = await request
            .get('/product')

        expect(response.status).toBe(200)
        expect(response.text).toBe("There is no X-USER-ID header in this request.")

        done();
    });
})
