// https://github.com/prisma/graphql-request

const express = require('express')
const router = express.Router()

const { request } = require("graphql-request");
const { isBirthday, isBlackFriday, dateTodayWithoutYear } = require("../lib")

const productsWithDiscount = (pct, products) => {
  const payload = products.map(product => {
    const { price_in_cents, discount, ...rest } = product;
    return {
      ...rest,
      price_in_cents,
      "discount": {
        pct,
        "value_in_cents": price_in_cents * pct
      },
    }
  });

  return payload;
}

router.get("/", async (req, res) => {
  console.log("Get request to /products");
  console.log(req.headers);

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

  try {
    const { getProducts } = await request(graphqlServer, productsQuery);

    const withTargetHeader = req.headers.hasOwnProperty("x-user-id");

    if (withTargetHeader) {
      const userId = req.headers["x-user-id"];
      const userPayload = `id: "${userId}"`;
      const userQuery = `{
        getUser(${userPayload}) {
          date_of_birth
        }
      }`;

      try {
        const { getUser } = await request(graphqlServer, userQuery);
        let { date_of_birth } = getUser;

        // if (true) { // test easily for blackfriday
        if (isBlackFriday(dateTodayWithoutYear())) {
          const pct = "0.1"; // discount
          const payload = productsWithDiscount(pct, getProducts);

          return res.json({ payload });
        } else {
          if (isBirthday(date_of_birth)) {
            const pct = "0.05"; // discount
            const payload = productsWithDiscount(pct, getProducts);

            console.log(payload);
            return res.json({ payload });
          } else {
            console.log(getProducts);
            return res.json({ payload: getProducts });
          }
        }
      } catch (e) {
        console.log(e);
        console.log("Something wrong while requesting user data.");
        return res.json({ payload: getProducts });
      }
    } else {
      console.log("There is no X-USER-ID header in this request.");
      return res.json({ payload: getProducts });
    }
  } catch(e) {
    console.log(e);
    return res.send("Something wrong while requesting products data.");
  }
})

module.exports = router


