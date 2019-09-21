const chalk = require("chalk");
const app = require("./server");

const port = 3000;

app.listen(port, () => {
  const blue = chalk.blue
  const target = blue(`http://localhost:${port}`)
  console.log(`🚀 Server ready at ${target}`)
})
