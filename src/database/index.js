const { app } = require("./server");
const cors = require("cors");

const port = 3001;
app.use(cors());

app.listen(port, () => {
  console.log(`player serviced at http://localhost:${port}`);
});
