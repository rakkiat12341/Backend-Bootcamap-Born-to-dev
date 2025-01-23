"use server";

import mysql from "mysql2";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "nong0831647211",
  database: "ecommercedb",
});

db.connect((err) => {
  if (err) {
    return console.log(err);
  }
});

export async function submitForm(formData) {
  const id = formData.get("id");
  const customer_name = formData.get("customer_name");
  const adress = formData.get("address");
  const phone = formData.get("phone");
  console.log(id, customer_name, adress, phone);

  const sql =
    "INSERT INTO customers (id, customer_name, adress, phone) VALUES (?, ?, ?, ?)";
  const value = [Number(id), customer_name, adress, phone];

  db.query(sql, value, (err, result) => {
    if (err) {
      return console.log(err);
    }
    console.log("Row affected:", result.affectedRows);
    console.log("ok");
  });
}
