const { app } = require("./server");
const cors = require("cors");

const port = 3000;
app.use(cors());

app.listen(port, () => {
  console.log(`games service started at port: ${port}`);
});
