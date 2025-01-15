const express = require("express");
const mysql = require("mysql2");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const swaggerDocs = require("./swaggerConfig");
const swaggerUi = require("swagger-ui-express");

dotenv.config();

const app = express();
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST, // อ่านค่าจาก .env
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Connected to database");
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Endpoint for get all data
/**
 * @swagger
 * /users:
 *   get:
 *     summary: ดึงข้อมูล Users ทั้งหมด
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *
 */
app.get("/users", (req, res) => {
  const sql = "SELECT * FROM users";
  db.query(sql, (err, result) => {
    if (err) {
      console.log("Error: ", err);
      res.status(500).send("Error: " + err);
      return;
    }

    res.json(result);
  });
});

// Endpoint for insert data

/**
 * @swagger
 * /users:
 *   post:
 *     summary: เพิ่มข้อมูล Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               age:
 *                 type: integer
 *               position:
 *                 type: string
 *             required:
 *               - fullName
 *               - age
 *               - position
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid input
 */

app.post("/users", (req, res) => {
  const { fullName, age, position } = req.body;

  // SQL query to insert data into the database
  const sql = "INSERT INTO users (fullName,age,position) VALUES (?,?,?)";

  //Execute the query for inserting data into database
  db.query(sql, [fullName, age, position], (err, result) => {
    if (err) {
      console.log("Error: ", err);
      res.status(500).send("Error: " + err);
      return;
    }
    res.status(201).send("User added successfully");
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Server is running on port", port);
  console.log("Swagger docs available at http://localhost:3000/api-docs");
});
