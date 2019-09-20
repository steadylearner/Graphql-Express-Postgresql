// https://node-postgres.com/guides/async-express
const db = require('../../db')
const { GetProduct, UpdateProduct } = require("../classes/Product")

const productResolvers = {
    Query: {
        getProduct: async (parent, { id }) => {
            const sql = 'SELECT * FROM products WHERE id = $1';
            const query = {
                text: sql,
                values: [id],
            };

            try {
                const { rows } = await db.query(query);
                const payload = rows[0]
                console.log("\n[GET] Product\n")
                console.log(payload)
                return new GetProduct(id, payload);
            } catch (e) {
                console.log(e);
            }
        },
    },
    Mutation: {
        createProduct: async (parent, { input }) => {
            // Create a random id for our "database".
            const id = require('crypto').randomBytes(10).toString('hex');
            const sql = "INSERT INTO products(id, price_in_cents, title, description, discount.pct, discount.value_in_cents) VALUES($1, $2, $3, $4, $5, $6)";

            const { price_in_cents, title, description, discount } = input;
            const { pct, value_in_cents } = discount;
            const query = {
                text: sql,
                values: [id, price_in_cents, title, description, pct, value_in_cents],
            };

            try {
                const { rowCount } = await db.query(query);
                return `Create ${rowCount} product with id(${id}).`;
            } catch (e) {
                console.log(e);
            }
        },
        updateProduct: async (parent, { id, input }) => {
            const sql = "UPDATE products SET price_in_cents = $1, title = $2, description = $3, discount.pct = $4, discount.value_in_cents = $5 WHERE id = $6"

            const { price_in_cents, title, description, discount } = input;
            const { pct, value_in_cents } = discount;

            const query = {
                text: sql,
                values: [price_in_cents, title, description, pct, value_in_cents, id],
            };

            try {
                const { rowCount } = await db.query(query);
                console.log(`update ${rowCount} product with id(${id}).`);
                return new UpdateProduct(id, input);
            } catch (e) {
                console.log(e);
            }
        },
        deleteProduct: async (parent, { id }) => {
            const sql = 'DELETE FROM products WHERE id = $1';
            const query = {
                text: sql,
                values: [id],
            };

            try {
                const { rowCount } = await db.query(query);
                if (rowCount === 1) {
                    return `Remove ${rowCount} product with id(${id}).`;
                } else {
                    return `There is no product with id(${id}) in database.`
                }
            } catch (e) {
                console.log(e);
            }
        },
    },
};

module.exports = productResolvers;
