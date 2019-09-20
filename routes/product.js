const express = require('express')
const router = express.Router()

const { request } = require("graphql-request");
const { isBirthday, isBlackFriday } = require("../lib")

// middleware that is specific to this router
// router.use(function timeLog(req, res, next) {
//     console.log('Time: ', Date.now())
//     next()
// })
// define the home page route

// echo JSON route for the request with userId and productId
// router.post('/', function (req, res) {
//     const { userId, productId } = req.body;

//     res.json({ userId, productId });
// })

// router.get("/:userId/:productId", function (req, res) {
//    const { userId, productId } = req.params;
//    res.json({ userId, productId });
// })

router.get("/", function (req, res) {
    console.log("Get request to /product");
    console.log(req.headers);
    const payload = req.headers["x-user-id"];

    if (payload) { // optional header
        // return with discount
    } else {
        // return without discount
    }  

    console.log(payload);
    // res.json({ userId, productId });
})

// app.post("/product", (req, res) => {
//   const { userId, productId } = req.body;
//   const graphqlServer = "http://localhost:4000/graphql"; // Should merge products and users folder to graphql and use it only

//   const userPayload = `id: "${userId}"`
//   const userQuery = `{
//     getUser(${userPayload}) {
//       date_of_birth
//     }
//   }`

//   const productPayload = `id: "${productId}"`
//   const productQuery = `{
//     getProduct(${productPayload}) {
//       title
//       price_in_cents
//       description
//       discount {
//         pct
//         value_in_cents
//       }
//     }
//   }`

//   try {
//     const { getUser } = await request(graphqlServer, userQuery); // if this connection fails return normal product
//     let { date_of_birth } = getUser;
//   } catch(e) {
//     console.log(e)
//   }

//   try {
//     const { getProduct } = await request(graphqlServer, productQuery)
//     const { price_in_cents, discount } = getProduct;
//   } catch(e) {
//     console.log(e)
//   }

//   if (isBlackFriday()) {
//     const discount = {
//       "pct": "0.1",
//       "value_in_cents": 0.1 * price_in_cents
//     }
//     res.json(discount);
//   } else {
//     if (isBirthday(date_of_birth)) {
//       const discount = {
//         "pct": "0.05",
//         "value_in_cents": 0.05 * price_in_cents
//       };
//       res.json(discount);
//     } else {
//       res.json(discount);
//     }
//   }

// })

module.exports = router

// // Test with client.js and move logics here later

// // Expõe uma rota HTTP tal que GET / product retorne um json com uma lista de produtos.

// // Essa rota deve receber opcionalmente via header X - USER - ID um id de usuário.

// // Para obter o desconto personalizado este serviço deve utilizar o serviço 1.

// // Caso o serviço 1 retorne um erro, a lista de produtos ainda precisa ser retornada, porém com esse produto que deu erro sem desconto.

// // Se o serviço de desconto(1) cair, o serviço de lista(2) tem que continuar funcionando e retornando a lista normalmente, só não vai aplicar os descontos.

