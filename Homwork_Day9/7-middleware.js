const express = require("express");
const app = express();

//middleware
const myLogger = (req, res, next) => {
  console.log("LOGGED");
  next();
};

app.use(myLogger);

app.get("/", (req, res) => {
  console.log("root");
  res.send("root");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
