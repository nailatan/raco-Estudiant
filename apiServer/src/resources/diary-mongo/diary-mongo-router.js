const express = require("express");
const {
  findAll,
  createOne,
  deleteOne,
  updateOne,
} = require("./diary-mongo-controller");

const diaryMongoRouter = express.Router();

diaryMongoRouter.get("/", findAll);
diaryMongoRouter.post("/", createOne);
diaryMongoRouter.delete("/:idDiary", deleteOne);
diaryMongoRouter.put("/:idDiary", updateOne);

module.exports = diaryMongoRouter;
