const { app } = require("./server");
const port = 3000;

app.listen(port, () => {
  console.log(`player serviced at http://localhost:${port}`);
});
