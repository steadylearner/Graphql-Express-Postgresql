// https://node-postgres.com/guides/async-express
const db = require('../../db')
const User = require("../classes/User")

const userResolvers = {
    Query: {
        getUser: async (_parent, { id }) => {
            const sql = 'SELECT * FROM users WHERE id = $1';
            const query = {
                text: sql,
                values: [id],
            };

            try {
                const { rows } = await db.query(query);
                const payload = rows[0];
                console.log("\n[GET] User\n");
                console.log(payload);
                return new User(id, payload);
            } catch (e) {
                console.log(e);
            }
        },
        getUsers: async () => {
            const sql = 'SELECT * FROM users';
            const query = {
                text: sql,
            };

            try {
                const { rows } = await db.query(query);
                console.log(rows);
                console.log("\n[GET] Users\n");
                return rows;
            } catch (e) {
                console.log(e);
            }
        },
    },
    Mutation: {
        createUser: async (_parent, { input }) => {
            // Create a random id for our "database".
            // const id = require('crypto').randomBytes(10).toString('hex');
            const sql = "INSERT INTO users(id, first_name, last_name, date_of_birth) VALUES($1, $2, $3, $4)";

            const { id, first_name, last_name, date_of_birth, } = input;
            const query = {
                text: sql,
                values: [id, first_name, last_name, date_of_birth],
            };

            try {
                const { rowCount } = await db.query(query);
                return `Create ${rowCount} user with id(${id}).`;
            } catch (e) {
                console.log(e);
                return e; // or should differenciate error, there is already user with this id etc
            }
        },
        updateUser: async (_parent, { id, input }) => {
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
                return e;
            }
        },
        deleteUser: async (_parent, { id }) => {
            const sql = 'DELETE FROM users WHERE id = $1';
            const query = {
                text: sql,
                values: [id],
            };

            try {
                const { rowCount } = await db.query(query);
                if (rowCount === 1) {
                    return `Remove ${rowCount} user with id(${id}).`;
                } else {
                    return `There is no user with id(${id}) in database.`
                }
            } catch (e) {
                console.log(e);
                return e;
            }
        },
        deleteUsers: async () => {
            const sql = 'DELETE FROM users';
            const query = {
                text: sql,
            };

            try {
                const { rowCount } = await db.query(query);
                return `Remove ${rowCount} users.`;
            } catch (e) {
                console.log(e);
                return e;
            }
        },
    },
};

module.exports = userResolvers;