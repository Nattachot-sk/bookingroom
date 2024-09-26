const mysql = require("mysql");



const db = mysql.createConnection({
  host: `${process.env.HOST}`,
  user: `${process.env.USER}`,
  password: "",
  port:"3305",
  database: `${process.env.DATABASE}`,
});


module.exports = db