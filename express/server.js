const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const mysql = require("mysql2");

dotenv.config();

const db = mysql.createConnection({
  host: process.env.DE_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DC_DATABASE,
});

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.use("/api/products", productsRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//add product

app.listen(port, () => {
  console.log("Example app listening on port 3000!");
});
