const { app } = require("./server");
const cors = require("cors");

const port = 3003;
app.use(cors());

app.listen(port, () => {
  console.log(`compare team serviced at http://localhost:${port}`);
});
