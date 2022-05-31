const mongoose = require("mongoose");
require("dotenv").config();

const USER = process.env["USUARIO_RACO_BD"];

const checkEnvVar = (name) => {
  if (process.env[name] === undefined) {
    throw new Error(`Undefined env. variable ${name}!!!`);
  }
  return process.env[name];
};

const connect = async () => {
  try {
    await mongoose.connect(checkEnvVar("MONGO_BBDD_URL"));
    console.log("Mongoose connected");
  } catch (e) {
    console.error(`Cannot connect Moongose: ${e}`);
  }
};

module.exports = { connect };
