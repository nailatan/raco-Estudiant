const express = require("express");
const {
  findAll,
  createOne,
  deleteOne,
  updateOne,
  findOne,
  findEvents,
  createDiaryEvent,
  updateDiaryEvent,
  deleteDiaryEvent,
  findOneEvent,
} = require("./diary-mongo-controller");

const diaryMongoRouter = express.Router();

diaryMongoRouter.get("/", findAll);
diaryMongoRouter.get("/:idDiary", findOne);
diaryMongoRouter.post("/", createOne);
diaryMongoRouter.delete("/:idDiary", deleteOne);
diaryMongoRouter.put("/:idDiary", updateOne);

diaryMongoRouter.get("/:idDiary/events", findEvents);
diaryMongoRouter.post("/:idDiary/events", createDiaryEvent);
diaryMongoRouter.put("/:idDiary/events/:idEvent", updateDiaryEvent);
diaryMongoRouter.delete("/:idDiary/events/:idEvent", deleteDiaryEvent);
diaryMongoRouter.get("/:idDiary/events/:idEvent", findOneEvent);

module.exports = diaryMongoRouter;
