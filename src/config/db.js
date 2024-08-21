const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  port: "3322",
  user: "root",
  password: "root",
  database: "todo_db",
});

module.exports = db;
