// https://node-postgres.com/features/connecting
// https://node-postgres.com/features/queries
// http://zetcode.com/javascript/nodepostgres/
// https://blog.logrocket.com/setting-up-a-restful-api-with-node-js-and-postgresql-d96d6fc892d8/

const { Client } = require("pg");
// const R = require("ramda");
const { PRODUCTS } = require("./setting");

const client = new Client(PRODUCTS);
client.connect();

// CREATE TABLE users(
//   id PRIMARY KEY,
//   first_name VARCHAR(255),
//   last_name VARCHAR(255),
//   date_of_birth DATE NOT NULL
// );

// const create = ({
//     id = '',
//     first_name = '',
//     last_name = '',
//     date_of_birth = '',
// }) => {
//     const sql = "INSERT INTO users(id, first_name, last_name, date_of_brith) VALUES($1, $2, $3, $4)";

//     const query = {
//         text: sql,
//         values: [first_name, last_name, date_of_birth],
//     }

//     client
//         .query(query)
//         .then(res => {
//             console.log(res);
//             const result = R.head(R.values(R.head(res.rows)));
//             console.log(result);
//         })
//         .finally(() => client.end());
// }

const read = (id = '') => {
    const sql = 'SELECT * FROM users WHERE id = $1'

    const query = {
        text: sql,
        values: [id, ],
    }

    client
        .query(query)
        .then(res => {
            // console.log(`There are ${res.rowCount} rows.\n`);
            const payload = res.rows[0];
            console.log(payload);

            // console.log(res.fields);
            // const result = R.head(R.values(R.head(res.rows)));
            // console.log(result);
        })
        .finally(() => client.end());
}

// const update = () => {

// };

// const delete = (id = '') => {
//     const sql = 'DELETE * FROM users WHERE id = $1'

//     const query = {
//         text: sql,
//         values: [id,],
//     }

//     client
//         .query(query)
//         .then(res => {
//             console.log(res);
//         })
//         .finally(() => client.end());
// }

read("1")

// export {
//     create,
//     read,
//     // update,
//     delete,
// }