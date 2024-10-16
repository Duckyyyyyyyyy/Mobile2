const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");

const app = express();
const port = 3000;

app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Nguginoi123!",
  database: "mobile2",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database: ", err);
    return;
  }
  console.log("connected to db");
});

//create
app.post("/api/users", (req, res) => {
  const { name, email } = req.body;
  const sql = "INSERT INTO user (name,email) VALUES (?, ?)";

  db.query(sql, [name, email], (err, result) => {
    if (err) {
      res.status(500).json({ message: "Error creating user", error: err });
    } else {
      res
        .status(201)
        .json({ message: "User created", userId: result.insertId });
    }
  });
});

//get

app.get("/api/users", (req, res) => {
  const sql = "SELECT * FROM user";

  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).json({ message: "Error fetching users", error: err });
    } else {
      res.json(result);
    }
  });
});

//getById

app.get("/api/users/:id", (req, res) => {
  const userId = req.params.id;
  const sql = "SELECT * FROM user WHERE id = ?";

  db.query(sql, [userId], (err, result) => {
    if (err) {
      res.status(500).json({ message: "Error fetching users", error: err });
    } else if (result.length === 0) {
      res.status(400).json({ message: "User not found" });
    } else {
      res.json(result[0]);
    }
  });
});

//update

app.put("/api/users/:id", (req, res) => {
  const userId = req.params.id;
  const { name, email } = req.body;
  const sql = "UPDATE user SET name = ?, email = ? WHERE id = ?";

  db.query(sql, [name, email, userId], (err, result) => {
    if (err) {
      res.status(500).json({ message: "Error updating users", error: err });
    } else if (result.affectedRows === 0) {
      res.status(400).json({ message: "User not found" });
    } else {
      res.json({ message: "User updated" });
    }
  });
});

//delete

app.delete("/api/users/:id", (req, res) => {
  const userId = req.params.id;
  const sql = "DELETE FROM user WHERE id = ?";

  db.query(sql, [userId], (err, result) => {
    if (err) {
      res.status(500).json({ message: "Error deleting users", error: err });
    } else if (result.affectedRows === 0) {
      res.status(400).json({ message: "User not found" });
    } else {
      res.json({ message: "User deleted" });
    }
  });
});

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
