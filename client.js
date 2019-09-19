// https://github.com/prisma/graphql-request

const { request } = require('graphql-request')

// use product isntead later
async function graphqlRequest(userId = "") {
  try {
    const payload = `id: "${userId}"`
    const userQuery = `{
      getUser(${payload}) {
        date_of_birth
      }
    }`

    const { getUser } = await request('http://localhost:4000/graphql', userQuery);
    const { date_of_birth } = getUser;
    const toNumber = new Number(date_of_birth);
    const date = new Date(toNumber);
    // const toStr = new String(date);
    // console.log(toStr);
    console.log(date)

    // const { getProduct } = await request('http://localhost:5000/graphql', product)
    // use products instead and return JSON value
  } catch(e) {
    console.log(e)
  }
}

graphqlRequest("87d80a98d811867885c1");
