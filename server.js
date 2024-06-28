const express = require("express");
const port = 3001;
const app = express();

app.get("/", (req, res) => {
  res.send("Got a get Express");
});

app.listen(port, () => {
  console.log("Listening on port 3000");
});
