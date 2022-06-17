const { Client, Pool } = require("pg");
require("dotenv").config();
const { checkEnvVar } = require("./helper");

const poolConnection = new Pool({
  user: checkEnvVar("USUARIO_BD"),
  host: checkEnvVar("HOST_DB"),
  database: checkEnvVar("DATABASE"),
  password: checkEnvVar("PWD_BD"),
  PORT_DB: checkEnvVar("PORT_DB"),
});

poolConnection.on("connect", (client) => {
  console.log(
    ` New client connection total = ${poolConnection.totalCount} checkedOut = ${poolConnection.idleCount} waiting= ${poolConnection.waitingCount}`
  );
});

poolConnection.on("acquire", (client) => {
  console.log(
    `client is checked out from the pool total = ${poolConnection.totalCount} checkedOut = ${poolConnection.idleCount} waiting= ${poolConnection.waitingCount}`
  );
});

poolConnection.on("error", (client) => {
  console.error(
    `client error total = ${poolConnection.totalCount} checkedOut = ${poolConnection.idleCount} waiting= ${poolConnection.waitingCount}`
  );
});

poolConnection.on("remove", (client) => {
  `client remove total = ${poolConnection.totalCount} checkedOut = ${poolConnection.idleCount} waiting= ${poolConnection.waitingCount}`;
});

// poolConnection.connect();

module.exports = poolConnection;
