const { Client, Pool } = require("pg");

const poolConnection = new Pool({
  user: "fullstack",
  host: "localhost",
  database: "racoEstudiantdb",
  password: "ailatan",
  port: "5432",
});

poolConnection.connect();

module.exports = poolConnection;
