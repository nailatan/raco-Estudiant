const express = require("express");
const {
  findAllDiaries,
  findOneDiary,
  createOneDiary,
  updateOneDiary,
  deleteOneDiary,
} = require("./diary-db");

const getAllDiaries = async (req, res) => {
  try {
    const list = await findAllDiaries();
    res.status(200).json({ result: list, error: [] });
  } catch (e) {
    console.error(`[ERROR] Diary.Controller.getAllDiaries error: ${e}`);
    res.status(500).json({ result: [], error: `Cannot get all diaries` });
  }
};

const getDiary = async (req, res) => {
  const idDiary = req.params.idDiary;
  try {
    const infoDiary = await findOneDiary(idDiary);
    res.status(200).json({
      result: infoDiary,
      error: [],
    });
  } catch (e) {
    console.error(`[ERROR] Diary.Controller.getDiary error: ${e}`);
    res.status(500).json({ result: [], error: `Cannot get diary ${idDiary}` });
  }
};

const createDiary = async (req, res) => {
  const dataDiary = req.body;
  try {
    const diaryCreated = await createOneDiary(dataDiary);
    res.status(200).json({ result: diaryCreated, error: [] });
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
    res.status(200).json({ result: diaryUpdated, error: [] });
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
    res.status(200).json({ result: diaryDeleted, error: [] });
  } catch (e) {
    console.error(`[ERROR] Diary.Controller.deleteOneDiary error: ${e}`);
    res
      .status(500)
      .json({ result: [], error: `Cannot delete diary  ${idDiary}` });
  }
};

const getAllEventsFromDiary = (req, res) => {
  const idDiary = req.params.idDiary;
  try {
    res
      .status(200)
      .json({ result: `Aqui los eventos del diary ${idDiary}`, error: [] });
  } catch (e) {
    console.error(`[ERROR] Diary.Controller.getAllDiaries error: ${e}`);
    res.status(500).json({
      result: [],
      error: `Cannot get all events from diary  ${idDiary}`,
    });
  }
};

const createDiaryEvent = (req, res) => {
  const idDiary = req.params.idDiary;
  try {
    res
      .status(200)
      .json({ result: `Nuevo evento del diario  ${idDiary}`, error: [] });
  } catch (e) {
    console.error(`[ERROR] Diary.Controller.createDiaryEvent error: ${e}`);
    res.status(500).json({
      result: [],
      error: `Cannot create an event in diary ${idDiary}`,
    });
  }
};

const updateDiaryEvent = (req, res) => {
  const idDiary = req.params.idDiary;
  const idEvent = req.params.idEvent;
  try {
    res.status(200).json({
      result: `Modificar evento ${idEvent} del diario  ${idDiary}`,
      error: [],
    });
  } catch (e) {
    console.error(`[ERROR] Diary.Controller.updateDiaryEvent error: ${e}`);
    res.status(500).json({
      result: [],
      error: `Cannot update event ${idEvent} from diary  ${idDiary}`,
    });
  }
};

const deleteDiaryEvent = (req, res) => {
  const idDiary = req.params.idDiary;
  const idEvent = req.params.idEvent;
  try {
    res.status(200).json({
      result: `Eliminar evento ${idEvent} del diario  ${idDiary}`,
      error: [],
    });
  } catch (e) {
    console.error(`[ERROR] Diary.Controller.deleteDiaryEvent error: ${e}`);
    res.status(500).json({
      result: [],
      error: `Cannot delete diary events from diary ${idDiary}`,
    });
  }
};

const getDiaryEvent = (req, res) => {
  const idDiary = req.params.idDiary;
  const idEvent = req.params.idEvent;
  try {
    res.status(200).json({
      result: `Datos del evento ${idEvent} del diario  ${idDiary}`,
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
