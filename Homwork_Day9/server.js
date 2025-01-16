const express = require("express");
const mysql = require("mysql2");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const swaggerDocs = require("./swaggerConfig");
const swaggerUi = require("swagger-ui-express");

dotenv.config();

const app = express();
app.use(bodyParser.json());

// middleware for get time stamp when user did request about API , and time will show in console
const timeStamp = function (req, res, next) {
  console.log(`Time stamp: ${Date.now()}`);
  next();
};
app.use(timeStamp);

//midleware for handle error
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: {
      message: err.message || "internal server error",
      status: err.status || 500,
    },
  });
  next();
});

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

// Endpoint for API documentation Swagger
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

app.post("/users", (req, res, next) => {
  const { fullName, age, position } = req.body;

  //Error handling
  if (!fullName || !age || !position) {
    const error = new Error("Invalid input data Plase fill all field");
    error.status = 400;
    return next(error);
  }

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

// Endpoint for delete data
/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: ลบข้อมูล users ด้วย id
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the user to delete
 *         schema:
 *           type: integer  

 *     responses:
 *       200: 
 *          description: User deleted successfully
 *       500:
 *          description: Server error
 */

app.delete("/users/:id", (req, res, next) => {
  const userId = req.params.id;
  const sql = "DELETE FROM users WHERE id = ?";

  if (!userId) {
    const error = new Error("Required id for delete");
    error.status = 400;
    return next(error);
  }

  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.log("Error: ", err);
      res.status(500).send("Error: " + err);
      return;
    }
    res.status(200).send(`User deleted successfully  with ID: ${userId}`);
  });
});

// Endpoint for update data
/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: เเก้ไข้อมูล Users
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the user to update
 *         schema:
 *           type: integer
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
 *         description: User updated successfully
 *       400:
 *         description: Invalid input
 */

app.put("/users/:id", (req, res, next) => {
  const userId = Number(req.params.id);
  const { fullName, age, position } = req.body;
  const sql =
    "UPDATE users SET fullName = ?, age = ?, position = ? WHERE id = ?";

  if (!userId || !fullName || !age || !position) {
    const error = new Error(
      "Invalid input data Plase fill all field for update"
    );
    error.status = 400;
    return next(error);
  }

  db.query(sql, [fullName, age, position, userId], (err, result) => {
    if (err) {
      console.log("Error: ", err);
      res.status(500).send("Error: " + err);
      return;
    }
    res.status(200).send(`User updated successfully  with ID: ${userId}`);
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Server is running on port", port);
  console.log("Swagger docs available at http://localhost:3000/api-docs");
});
