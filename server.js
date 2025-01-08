const express = require("express");
const app = express();
const port = 4000;

app.get("/", (req, res) => {
  res.send("Got a get Express");
});

app.listen(port, () => {
  console.log("Listening on port 3000");
});
