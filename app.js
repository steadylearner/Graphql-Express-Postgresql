// https://www.freecodecamp.org/news/how-to-write-a-production-ready-node-and-express-app-f214f0b17d8c/
const express = require("express");
const bodyParser = require("body-parser");

const chalk = require("chalk");

const app = express();
const port = 3000;

const { product } = require("./routes");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.get("/", (req, res) => {
//   res.send("Hello, this works fine.");
// })

// https://expressjs.com/en/guide/routing.html
app.use("/product", product)

app.listen(port, () => {
  const blue = chalk.blue
  const target = blue(`http://localhost:${port}`)
  console.log(`🚀 Server ready at ${target}`)
})

module.exports = app;
