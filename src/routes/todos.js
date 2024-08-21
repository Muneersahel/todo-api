const express = require("express");
const db = require("../config/db");

const router = express.Router();

let todos = [
  { id: 1, title: "Learn nodejs routes implementation", completed: false },
  { id: 2, title: "Create a crud apis", completed: false },
];

// READ
router.get("/", (req, res) => {
  const sql = "SELECT * FROM todos";
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.json(result);
  });
});

// READ
router.get("/:id", (req, res) => {
  const id = req.params.id;

  const sql = `SELECT * FROM todos WHERE id = ${id}`;

  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.json(result[0]);
  });
});

// CREATE
router.post("/", (req, res) => {
  const title = req.body.title;
  const author = req.body.author;

  const newTodo = { title, author, completed: false };

  const sql = "INSERT INTO todos (title, author, completed) VALUES (?, ?, ?)";
  db.query(sql, [title, author, false], (err, result) => {
    if (err) {
      throw err;
    }
    newTodo.id = result.insertId;
    res.json(newTodo);
  });
});

// UPDATE
router.put("/:id", (req, res) => {
  const id = req.params.id;

  const title = req.body.title;
  const author = req.body.author;
  const completed = req.body.completed;

  const sql =
    "UPDATE todos SET title = ?, author = ?, completed = ? WHERE id = ?";

  db.query(sql, [title, author, completed, id], (err, result) => {
    if (err) {
      throw err;
    }

    const updatedTodo = { id: parseInt(id), title, author, completed };

    res.json(updatedTodo);
  });
});

// DELETE
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  const sql = "DELETE FROM todos WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      throw err;
    }

    res.json({ message: "Todo deleted" });
  });
});

module.exports = router;
