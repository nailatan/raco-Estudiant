const express = require("express");
const {
  findAllDiaries,
  findOneDiary,
  createOneDiary,
  updateOneDiary,
  deleteOneDiary,
} = require("./diary-db");
const {
  findAllEvents,
  createOneEvent,
  updateOneEvent,
  findOneEvents,
  deleteOneEvents,
} = require("../event/event-db");

const getAllDiaries = async (req, res) => {
  try {
    const list = await findAllDiaries();
    res.status(200).json({ result: list, error: [] });
  } catch (e) {
    console.error(`[ERROR] Diary.Controller.getAllEvents error: ${e}`);
    res.status(500).json({ result: [], error: `Cannot get all diaries` });
  }
};

const getDiary = async (req, res) => {
  const idDiary = req.params.idDiary;
  try {
    const infoDiary = await findOneDiary(idDiary);
    if (infoDiary != null) {
      res.status(200).json({
        result: [infoDiary],
        error: [],
      });
    } else {
      res.status(404).json({
        result: [],
        error: [`Cannot find diary  with id ${idDiary}`],
      });
    }
  } catch (e) {
    console.error(`[ERROR] Diary.Controller.getDiary error: ${e}`);
    res.status(500).json({ result: [], error: `Cannot get diary ${idDiary}` });
  }
};

const createDiary = async (req, res) => {
  const dataDiary = req.body;
  try {
    const diaryCreated = await createOneDiary(dataDiary);
    res.status(200).json({ result: [diaryCreated], error: [] });
  } catch (e) {
    console.error(`[ERROR] Diary.Controller.createOneDiary error: ${e}`);
    res.status(500).json({ result: [], error: `Cannot create diary` });
  }
};

const updateDiary = async (req, res) => {
  const idDiary = req.params.idDiary;
  const dataDiary = req.body;
  try {
    const diaryUpdated = await updateOneDiary(idDiary, dataDiary);
    if (diaryUpdated != null) {
      res.status(200).json({ result: [diaryUpdated], error: [] });
    } else {
      res.status(404).json({
        result: [],
        error: [`Cannot find diary  with id ${idDiary}`],
      });
    }
  } catch (e) {
    console.error(`[ERROR] Diary.Controller.updateOneDiary error: ${e}`);
    res
      .status(500)
      .json({ result: [], error: `Cannot update diary ${idDiary}` });
  }
};

const deleteDiary = async (req, res) => {
  const idDiary = req.params.idDiary;
  try {
    const diaryDeleted = await deleteOneDiary(idDiary);
    if (diaryDeleted != null) {
      res.status(200).json({ result: [diaryDeleted], error: [] });
    } else {
      res.status(404).json({
        result: [],
        error: [`Cannot find diary  with id ${idDiary}`],
      });
    }
  } catch (e) {
    console.error(`[ERROR] Diary.Controller.deleteOneDiary error: ${e}`);
    res
      .status(500)
      .json({ result: [], error: `Cannot delete diary  ${idDiary}` });
  }
};

const getAllEventsFromDiary = async (req, res) => {
  const idDiary = req.params.idDiary;
  console.log(`${req.params.idDiary}`);
  try {
    const list = await findAllEvents(idDiary);
    res.status(200).json({ result: list, error: [] });
  } catch (e) {
    console.error(`[ERROR] Diary.Controller.getAllEventsFromDiary error: ${e}`);
    res.status(500).json({
      result: [],
      error: `Cannot get all events from diary  ${idDiary}`,
    });
  }
};

const createDiaryEvent = async (req, res) => {
  const idDiary = req.params.idDiary;
  const eventData = req.body;
  console.log(`${req.params.idDiary}`);
  try {
    const eventCreated = await createOneEvent(idDiary, eventData);
    res.status(200).json({ result: [eventCreated], error: [] });
  } catch (e) {
    console.error(`[ERROR] Diary.Controller.createDiaryEvent error: ${e}`);
    res.status(500).json({
      result: [],
      error: `Cannot create an event in diary ${idDiary}`,
    });
  }
};

const updateDiaryEvent = async (req, res) => {
  const idDiary = req.params.idDiary;
  const idEvent = req.params.idEvent;
  const dataEvent = req.body;
  try {
    const eventModified = await updateOneEvent(idEvent, dataEvent);
    if (eventModified != null) {
      res.status(200).json({
        result: [eventModified],
        error: [],
      });
    } else {
      res.status(404).json({
        result: [],
        error: [`Cannot find event with id ${idEvent}`],
      });
    }
  } catch (e) {
    console.error(`[ERROR] Diary.Controller.updateDiaryEvent error: ${e}`);
    res.status(500).json({
      result: [],
      error: `Cannot update event ${idEvent} from diary  ${idDiary}`,
    });
  }
};

const deleteDiaryEvent = async (req, res) => {
  const idDiary = req.params.idDiary;
  const idEvent = req.params.idEvent;
  try {
    const eventDeleted = await deleteOneEvents(idEvent);
    if (eventDeleted != null) {
      res.status(200).json({
        result: eventDeleted,
        error: [],
      });
    } else {
      res.status(404).json({
        result: [],
        error: [`Cannot find event with id ${idEvent}`],
      });
    }
  } catch (e) {
    console.error(`[ERROR] Diary.Controller.deleteDiaryEvent error: ${e}`);
    res.status(500).json({
      result: [],
      error: `Cannot delete diary events from diary ${idDiary}`,
    });
  }
};

const getDiaryEvent = async (req, res) => {
  const idDiary = req.params.idDiary;
  const idEvent = req.params.idEvent;
  try {
    const eventData = await findOneEvents(idEvent);
    res.status(200).json({
      result: eventData,
      error: [],
    });
  } catch (e) {
    console.error(`[ERROR] Diary.Controller.getDiaryEvent error: ${e}`);
    res.status(500).json({
      result: [],
      error: `Cannot get diary events  from diary ${idDiary}`,
    });
  }
};

module.exports = {
  getAllDiaries,
  createDiary,
  updateDiary,
  deleteDiary,
  getDiary,
  getAllEventsFromDiary,
  createDiaryEvent,
  updateDiaryEvent,
  deleteDiaryEvent,
  getDiaryEvent,
};
