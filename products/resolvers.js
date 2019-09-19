// https://node-postgres.com/guides/async-express
const db = require('../db')
const { User } = require("./User")

const resolvers = {
    Query: {
        getUser: async (parent, { id }) => {
            const sql = 'SELECT * FROM users WHERE id = $1';
            const query = {
                text: sql,
                values: [id],
            };

            try {
                const { rows } = await db.query(query);
                const payload = rows[0]
                console.log(payload)
                return new User(id, payload);
            } catch (e) {
                console.log(e);
            }
        },
    },
    Mutation: {
        createUser: async (parent, { input }) => {
            // Create a random id for our "database".
            const id = require('crypto').randomBytes(10).toString('hex');
            const sql = "INSERT INTO users(id, first_name, last_name, date_of_birth) VALUES($1, $2, $3, $4)";

            const { first_name, last_name, date_of_birth, } = input;
            const query = {
                text: sql,
                values: [id, first_name, last_name, date_of_birth],
            };

            try {
                const { rowCount } = await db.query(query);
                return `${rowCount} user with ${id} was created.`;
            } catch (e) {
                console.log(e);
            }
        },
        updateUser: async (parent, { id, input }) => {
            const sql = "UPDATE users SET first_name = $1, last_name = $2, date_of_birth = $3 WHERE id = $4"
            const { first_name, last_name, date_of_birth } = input;
            const query = {
                text: sql,
                values: [first_name, last_name, date_of_birth, id],
            };

            try {
                const { rowCount } = await db.query(query);
                console.log(`update ${rowCount} user with id(${id}).`);
                return new User(id, input);
            } catch (e) {
                console.log(e);
            }
        },
        deleteUser: async (parent, { id }) => {
            const sql = 'DELETE FROM users WHERE id = $1';
            const query = {
                text: sql,
                values: [id],
            };

            try {
                const { rowCount } = await db.query(query);
                return `${rowCount} user with ${id} was removed.`;
            } catch (e) {
                console.log(e);
            }
        },
    },
};

module.exports = {
    resolvers,
}