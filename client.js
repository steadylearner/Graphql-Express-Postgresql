// https://github.com/prisma/graphql-request

const { request } = require("graphql-request");
const { isBirthday, isBlackFriday } = require("./lib")

// When everything passes, 
// make a route that accept product id and move code here to it. 
// separate users and products folder in docker
async function graphqlRequest(userId = "") {
  try {
    const payload = `id: "${userId}"`
    const userQuery = `{
      getUser(${payload}) {
        date_of_birth
      }
    }`

    // const { getProduct } = await request('http://localhost:5000/graphql', product)
    const { getUser } = await request('http://localhost:4000/graphql', userQuery); // if this connection fails return normal product
    let { date_of_birth } = getUser;

    // if (isBlackFriday) {
    //    function for 10% discount for product and return json   
    // } else {
    //   if (isBirthday) {
    //      function for 5% discount and return json
    //   } else {
    //      return json from product
    //   }
    // }

    console.log(isBirthday(date_of_birth));

    // use products instead and return JSON value
  } catch (e) {
    console.log(e)
  }
}

graphqlRequest("87d80a98d811867885c1");
