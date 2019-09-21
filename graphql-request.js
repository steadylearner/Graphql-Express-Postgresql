// https://github.com/prisma/graphql-request

const { request } = require("graphql-request");
const { isBirthday, isBlackFriday } = require("./lib")

async function graphqlRequest(userId = "") {
  const graphqlServer = "http://localhost:4000/graphql";
  const productsQuery = `{
    getProducts {
      id
      price_in_cents
      description
      discount {
        pct
        value_in_cents
      }
    }
  }`

  const userPayload = `id: "${userId}"`;
  const userQuery = `{
    getUser(${userPayload}) {
      date_of_birth
    }
  }`;

  try {
    const { getProducts } = await request(graphqlServer, productsQuery)
    // console.log(getProducts);

    // [ { id: '6d7c6ea7e68fe68a97c2',
    //   price_in_cents: 500,
    //   description: 'cheap',
    //   discount: { pct: 0.05, value_in_cents: 25 } },
    // { id: '1871abeb83acaf91b97a',
    //   price_in_cents: 1000,
    //   description: 'expensive',
    //   discount: { pct: 0.6, value_in_cents: 600 } } ]
    try {
      const { getUser } = await request(graphqlServer, userQuery);
      let { date_of_birth } = getUser;

      if (isBlackFriday()) {
        const pct = "0.1"; // discount
        const payload  = getProducts.map(product => {
          const { price_in_cents, discount, ...rest } = product;
          return {
            ...rest,
            price_in_cents,
            pct,
            "value_in_cents": price_in_cents * pct
          }
        });

        console.log(payload);
        return payload;
      } else {
        if (isBirthday(date_of_birth)) {
          const pct = "0.05"; // discount
          const payload = getProducts.map(product => {
            const { price_in_cents, discount, ...rest } = product;
            return {
              ...rest,
              price_in_cents,
              pct,
              "value_in_cents": price_in_cents * pct
            }
          });

          console.log(payload);
          return payload;
        } else {
          console.log(getProducts);
          return getProducts;
        }
      }
    } catch(e) {
      console.log(e);
      console.log("Something wrong while requesting user data.");
      console.log(getProducts);
      return getProducts;
    }
  } catch(e) {
    console.log(e);
    return "Something wrong while requesting products data.";
  }
}

graphqlRequest("b65867d747e1bb1fcfe5");
graphqlRequest("f60d06808777adf1c991");

// 1. Graphql with graphql-request
// async function graphqlRequest(userId = "", productId = "") {
//   const graphqlServer = "http://localhost:4000/graphql";
//   try {
//     const productPayload = `id: "${productId}"`
//     const productQuery = `{
//       getProduct(${productPayload}) {
//         title
//         price_in_cents
//         description
//         discount {
//           pct
//           value_in_cents
//         }
//       }
//     }`

//     const { getProduct } = await request(graphqlServer, productQuery)
//     const { price_in_cents, discount } = getProduct;
//     // console.log(discount);

//     const userPayload = `id: "${userId}"`
//     const userQuery = `{
//       getUser(${userPayload}) {
//         date_of_birth
//       }
//     }`

//     const { getUser } = await request(graphqlServer, userQuery);
//     let { date_of_birth } = getUser;

//     if (isBlackFriday()) {
//       const discount = {
//         "pct": "0.1",
//         "value_in_cents": 0.1 * price_in_cents
//       }
//       const discount_in_json = JSON.stringify(discount);
//       console.log(discount_in_json);
//     } else {
//       if (isBirthday(date_of_birth)) {
//         const discount = {
//           "pct": "0.05",
//           "value_in_cents": 0.05 * price_in_cents
//         };
//         const discount_in_json = JSON.stringify(discount); 
//         console.log(discount_in_json); // return json
//       } else {
//         const discount_in_json = JSON.stringify(discount);
//         console.log(discount_in_json);
//       }
//     }

//     // console.log(isBirthday(date_of_birth));

//     // use products instead and return JSON value
//   } catch (e) {
//     console.log(e)
//   }
// }

// graphqlRequest("d0418e582890f3d8dacb", "c7a49a7e7a150d9309e0");
// graphqlRequest("87d80a98d811867885c1", "c7a49a7e7a150d9309e0");

// When everything passes,
// make a route that accept product id and move code here to it.
// separate users and products folder in docker


