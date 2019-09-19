// https://github.com/motdotla/dotenv#path
require('dotenv').config({ path: "../.env" })

const { Client } = require("pg");

const PRODUCTS = process.env.PRODUCTS;
const client = new Client(PRODUCTS);
client.connect();

// https://node-postgres.com/guides/project-structure
module.exports = {
    query: (text, params, callback) => {
        return client.query(text, params, callback)
    },
}

