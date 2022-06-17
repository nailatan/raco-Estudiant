const express = require("express");
const {
  findAll,
  createOne,
  deleteOne,
  updateOne,
  findOne,
} = require("./diary-mongo-controller");

const diaryMongoRouter = express.Router();

diaryMongoRouter.get("/", findAll);
diaryMongoRouter.get("/:idDiary", findOne);
diaryMongoRouter.post("/", createOne);
diaryMongoRouter.delete("/:idDiary", deleteOne);
diaryMongoRouter.put("/:idDiary", updateOne);

module.exports = diaryMongoRouter;
