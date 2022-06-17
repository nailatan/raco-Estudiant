const mongoose = require("mongoose");
const { checkEnvVar } = require("./helper");
require("dotenv").config();

const connect = async () => {
  try {
    await mongoose.connect(checkEnvVar("MONGO_BBDD_URL"));
    console.log("Mongoose connected");
  } catch (e) {
    console.error(`Cannot connect Moongose: ${e}`);
  }
};

module.exports = { connect };
