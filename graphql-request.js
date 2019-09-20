// https://github.com/prisma/graphql-request

const { request } = require("graphql-request");
const { isBirthday, isBlackFriday } = require("./lib")

// 1. Graphql with graphql-request
async function graphqlRequest(userId = "", productId = "") {
  const graphqlServer = "http://localhost:4000/graphql";
  try {
    const productPayload = `id: "${productId}"`
    const productQuery = `{
      getProduct(${productPayload}) {
        title
        price_in_cents
        description
        discount {
          pct
          value_in_cents
        }
      }
    }`

    const { getProduct } = await request(graphqlServer, productQuery)
    const { price_in_cents, discount } = getProduct;
    // console.log(discount);

    const userPayload = `id: "${userId}"`
    const userQuery = `{
      getUser(${userPayload}) {
        date_of_birth
      }
    }`

    const { getUser } = await request(graphqlServer, userQuery);
    let { date_of_birth } = getUser;

    if (isBlackFriday()) {
      const discount = {
        "pct": "0.1",
        "value_in_cents": 0.1 * price_in_cents
      }
      const discount_in_json = JSON.stringify(discount);
      console.log(discount_in_json);
    } else {
      if (isBirthday(date_of_birth)) {
        const discount = {
          "pct": "0.05",
          "value_in_cents": 0.05 * price_in_cents
        };
        const discount_in_json = JSON.stringify(discount); 
        console.log(discount_in_json); // return json
      } else {
        const discount_in_json = JSON.stringify(discount);
        console.log(discount_in_json);
      }
    }

    // console.log(isBirthday(date_of_birth));

    // use products instead and return JSON value
  } catch (e) {
    console.log(e)
  }
}

graphqlRequest("d0418e582890f3d8dacb", "c7a49a7e7a150d9309e0");
// graphqlRequest("87d80a98d811867885c1", "c7a49a7e7a150d9309e0");

// When everything passes,
// make a route that accept product id and move code here to it.
// separate users and products folder in docker


