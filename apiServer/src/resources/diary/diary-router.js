const express = require("express");
const {
  getAllDiaries,
  createDiary,
  updateDiary,
  deleteDiary,
  getAllEventsFromDiary,
  createDiaryEvent,
  updateDiaryEvent,
  deleteDiaryEvent,
  getDiaryEvent,
  getDiary,
} = require("./diary-controller");

const diaryRouter = express.Router();

diaryRouter.get("/", getAllDiaries);
diaryRouter.put("/", createDiary);
diaryRouter.post("/:idDiary", updateDiary);
diaryRouter.delete("/:idDiary", deleteDiary);
diaryRouter.get("/:idDiary", getDiary);

diaryRouter.get("/:idDiary/events", getAllEventsFromDiary);
diaryRouter.put("/:idDiary/events", createDiaryEvent);
diaryRouter.post("/:idDiary/events/:idEvent", updateDiaryEvent);
diaryRouter.delete("/:idDiary/events/:idEvent", deleteDiaryEvent);
diaryRouter.get("/:idDiary/events/:idEvent", getDiaryEvent);

module.exports = diaryRouter;
