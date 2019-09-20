const axios = require("axios");

// axios.post("http://localhost:3000/product", {
//     userId: "whatever",
//     productId: "whatever",
//   })
//   .then(function (response) {
//     console.log(response.data);
//     // Should be pct and value_in_cents
//   })
//   .catch(function (error) {
//     console.log(error);
//   }); 

// axios.get("http://localhost:3000/product/whatever/whatever")
//  .then(function (response) {
//    console.log(response);
//    // Should be pct and value_in_cents
//  })
//  .catch(function (error) {
//    console.log(error);
//  });

axios.get("http://localhost:3000/product", { headers: { "X-USER-ID": "test" } })
  .then(function (response) {
    console.log(response);
    // Should be pct and value_in_cents
  })
  .catch(function (error) {
    console.log(error);
  });
