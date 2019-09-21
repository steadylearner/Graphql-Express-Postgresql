const chalk = require("chalk");
const server = require("./server");

const port = 3000;

server.listen(port, () => {
  const blue = chalk.blue
  const target = blue(`http://localhost:${port}`)
  console.log(`🚀 Server ready at ${target}`)
})
