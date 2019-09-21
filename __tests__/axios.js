const axios = require("axios");

// curl 'http://localhost:4000/graphql' - H 'Accept-Encoding: gzip, deflate, br' - H 'Content-Type: application/json' - H 'Accept: application/json' - H 'Connection: keep-alive' - H 'DNT: 1' - H 'Origin: http://localhost:4000' --data - binary '{"query":"{\n  getUsers {\n    id\n  }\n}"}' --compressed

describe("Test axios", () => {
    test("With graphql query getUsers", async done => {
        const graphqlServer = "http://localhost:4000/graphql";

        const usersQuery = `{
            getUsers {
                id
            }
        }`

        const response = await axios.post(graphqlServer, { "query": usersQuery })
        const { data } = response;
        const payload = data.data.getUsers;
        // console.log(payload);
        // console.log(response);

        expect(response.status).toBe(200);
        expect(Array.isArray(payload)).toBe(true);

        done();
    });
})

