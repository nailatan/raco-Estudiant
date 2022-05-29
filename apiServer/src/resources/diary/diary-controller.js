const express = require("express");

const getAllDiaries = (req, res) => {
  try {
    res.status(200).json({ result: "Aqui los diarios", error: [] });
  } catch (e) {
    console.error(`[ERROR] Diary.Controller.getAllDiaries error: ${e}`);
  }
};

const createOneDiary = (req, res) => {
  try {
    res.status(200).json({ result: "Aqui el diario creado", error: [] });
  } catch (e) {
    console.error(`[ERROR] Diary.Controller.createOneDiary error: ${e}`);
  }
};

const updateOneDiary = (req, res) => {
  try {
    res.status(200).json({ result: "Aqui el diario modificado", error: [] });
  } catch (e) {
    console.error(`[ERROR] Diary.Controller.updateOneDiary error: ${e}`);
  }
};

const deleteOneDiary = (req, res) => {
  try {
    res.status(200).json({ result: "Aqui el diario eliminado", error: [] });
  } catch (e) {
    console.error(`[ERROR] Diary.Controller.deleteOneDiary error: ${e}`);
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
  }
};

const getDiary = (req, res) => {
  const idDiary = req.params.idDiary;
  try {
    res.status(200).json({
      result: `Datos del diario  ${idDiary}`,
      error: [],
    });
  } catch (e) {
    console.error(`[ERROR] Diary.Controller.getDiary error: ${e}`);
  }
};

module.exports = {
  getAllDiaries,
  createOneDiary,
  updateOneDiary,
  deleteOneDiary,
  getDiary,
  getAllEventsFromDiary,
  createDiaryEvent,
  updateDiaryEvent,
  deleteDiaryEvent,
  getDiaryEvent,
};
