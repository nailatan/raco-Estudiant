const { Client, Pool } = require("pg");
require("dotenv").config();

const checkEnvVar = (name) => {
  if (process.env[name] === undefined) {
    throw new Error(`Undefined env. variable ${name}!!!`);
  }
  return process.env[name];
};

const poolConnection = new Pool({
  user: checkEnvVar("USUARIO_BD"),
  host: checkEnvVar("HOST_DB"),
  database: checkEnvVar("DATABASE"),
  password: checkEnvVar("PWD_BD"),
  PORT_DB: checkEnvVar("PORT_DB"),
});

// poolConnection.connect();

module.exports = poolConnection;
