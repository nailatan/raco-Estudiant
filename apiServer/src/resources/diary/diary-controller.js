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

const getAllDiaries = async (req, res, next) => {
  try {
    const list = await findAllDiaries();
    res.status(200).json({ result: list, error: [] });
  } catch (e) {
    next(e);
  }
};

const getDiary = async (req, res, next) => {
  const idDiary = req.params.idDiary;
  try {
    const infoDiary = await findOneDiary(idDiary);
    if (infoDiary != null) {
      res.status(200).json({
        result: [infoDiary],
        error: [],
      });
    } else {
      throw new Error(`Cannot find diary  with id ${idDiary}`);
    }
  } catch (e) {
    e.entity = "diary";
    next(e);
  }
};

const createDiary = async (req, res, next) => {
  const dataDiary = req.body;
  try {
    const diaryCreated = await createOneDiary(dataDiary);
    res.status(200).json({ result: [diaryCreated], error: [] });
  } catch (e) {
    next(e);
  }
};

const updateDiary = async (req, res, next) => {
  const idDiary = req.params.idDiary;
  const dataDiary = req.body;
  try {
    const diaryUpdated = await updateOneDiary(idDiary, dataDiary);
    if (diaryUpdated != null) {
      res.status(200).json({ result: [diaryUpdated], error: [] });
    } else {
      throw new Error(`Cannot find diary  with id ${idDiary}`);
    }
  } catch (e) {
    next(e);
  }
};

const deleteDiary = async (req, res, next) => {
  const idDiary = req.params.idDiary;
  try {
    const diaryDeleted = await deleteOneDiary(idDiary);
    if (diaryDeleted != null) {
      res.status(200).json({ result: [diaryDeleted], error: [] });
    } else {
      throw new Error(`Cannot find diary  with id ${idDiary}`);
    }
  } catch (e) {
    next(e);
  }
};

const getAllEventsFromDiary = async (req, res, next) => {
  const idDiary = req.params.idDiary;
  console.log(`${req.params.idDiary}`);
  try {
    const list = await findAllEvents(idDiary);
    res.status(200).json({ result: list, error: [] });
  } catch (e) {
    console.error(`[ERROR] Diary.Controller.getAllEventsFromDiary error: ${e}`);
    next(e);
  }
};

const createDiaryEvent = async (req, res, next) => {
  const idDiary = req.params.idDiary;
  const eventData = req.body;

  try {
    const eventCreated = await createOneEvent(idDiary, eventData);
    res.status(200).json({ result: [eventCreated], error: [] });
  } catch (e) {
    e.entity = "event";
    next(e);
  }
};

const updateDiaryEvent = async (req, res, next) => {
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
      throw { code: 404, message: `Cannot find event with id ${idEvent}` };
    }
  } catch (e) {
    e.entity = "event";
    next(e);
  }
};

const deleteDiaryEvent = async (req, res, next) => {
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
      throw {
        code: 404,
        message: `Cannot find event with id ${idEvent}`,
      };
    }
  } catch (e) {
    e.entity = "event";
    next(e);
  }
};

const getDiaryEvent = async (req, res, next) => {
  const idDiary = req.params.idDiary;
  const idEvent = req.params.idEvent;
  try {
    const eventData = await findOneEvents(idEvent);
    if (eventData) {
      res.status(200).json({
        result: eventData,
        error: [],
      });
    } else {
      throw {
        code: 404,
        message: "Cannot find event",
      };
    }
  } catch (e) {
    e.entity = "event";
    next(e);
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
