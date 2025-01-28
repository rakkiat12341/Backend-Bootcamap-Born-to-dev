const express = require("express");
const bodyParser = require("body-parser");

const apiKey = "123456";

const authKey = (req, res, next) => {
  const providedKey = req.headers["api-key"];

  if (providedKey && providedKey === apiKey) {
    next();
  } else {
    res.status(403).send("unauthorized");
  }
};

const app = express();

app.use(bodyParser.json());
app.use(authKey);

app.use("/", (req, res) => {
  res.send("hello world");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
