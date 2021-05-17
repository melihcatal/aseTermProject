const { app } = require("./server");
const cors = require("cors");

const port = 3002;
app.use(cors());

app.listen(port, () => {
  console.log(`player serviced at http://localhost:${port}`);
});
