const server = require('../server')
const supertest = require('supertest')
const request = supertest(server)

describe("Test express with Jest and supertest", () => {
    test("GET /product with X-USER-ID header", async done => {
        const response = await request
            .get('/product')
            .set("X-USER-ID", "test")

        expect(response.status).toBe(200)
        expect(response.body.userId).toBe('test')

        done();
    });

    test("GET /productout with X-USER-ID header", async done => {
        const response = await request
            .get('/product')

        expect(response.status).toBe(200)
        expect(response.text).toBe("There is no X-USER-ID header in this request.")

        done();
    });
})
