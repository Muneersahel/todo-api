const express = require("express");

const router = express.Router();

let todos = [
  { id: 1, title: "Learn nodejs routes implementation", completed: false },
  { id: 2, title: "Create a crud apis", completed: false },
];

// READ
router.get("/", (req, res) => {
  res.json(todos);
});

// READ
router.get("/:id", (req, res) => {
  const id = req.params.id;
  const todo = todos.find((todo) => todo.id === parseInt(id));

  if (!todo) {
    return res.status(404).json({ message: "Todo not found" });
  }

  res.json(todo);
});

// CREATE
router.post("/", (req, res) => {
  const title = req.body.title;

  const id = todos.length + 1;
  const newTodo = { id, title, completed: false };

  todos.push(newTodo);
  res.json(newTodo);
});

// UPDATE
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const todo = todos.find((todo) => todo.id === parseInt(id));

  if (!todo) {
    return res.status(404).json({ message: "Todo not found" });
  }

  const completed = req.body.completed;

  todo.completed = completed;

  res.json(todo);
});

// DELETE
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  const todo = todos.find((todo) => todo.id === parseInt(id));

  if (!todo) {
    return res.status(404).json({ message: "Todo not found" });
  }

  todos = todos.filter((t) => t.id !== todo.id);

  res.json(todo);
});

module.exports = router;
