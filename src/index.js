const express = require("express");
const todos = require("./routes/todos");

const app = express();
const port = 3000;

app.use(express.json());

// LOGGING MIDDLEWARE
app.use((req, res, next) => {
  const now = new Date();
  console.log(`[${now}] Method: ${req.method} ${req.url}`);
  next();
});

app.get("/", (req, res) => {
  res.send("Hello World!!!");
});

app.use("/todos", todos);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.listen(port, () => {
  console.log("Server is running on port: " + port);
});
