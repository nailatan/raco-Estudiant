const express = require("express");

const getAllStudent = async (req, res) => {
  try {
    res.status(200).json({ result: "Aqui iran los estudiantes", error: " " });
  } catch (e) {
    console.error(`[ERROR] Student.Controller.getAll : ${e}`);
    res.status(500).json({ result: [], error: "Cannot get list of Students" });
  }
};

const createStudent = async (req, res) => {
  try {
    res.status(201).json({
      result: "Estudiante creado",
      error: "",
    });
  } catch (e) {
    console.error(`[ERROR} Student.Controller.create: ${e}`);
    res.status(500).json({ result: [], error: "Cannot create student" });
  }
};

const getOneStudent = async (req, res) => {
  try {
    res.status(200).json({
      result: "Datos del estudiante",
      error: "",
    });
  } catch (e) {
    console.error(`[ERROR] Student.Controller.Get error: ${e}`);
    res
      .status(500)
      .json({ result: [], error: "Cannot get student with id ${id}" });
  }
};

const deleteStudent = async (req, res) => {
  try {
    res.status(200).json({
      result: "Estudiante eliminado",
      error: "",
    });
  } catch (e) {
    console.error(`[ERROR] Student.Controller.deleteStudent error: ${e}`);
    res
      .status(500)
      .json({ result: [], error: "Cannot delete student with id ${id}" });
  }
};

const updateStudent = async (req, res) => {
  try {
    res.status(200).json({
      result: "Estudiante modificado",
      error: "",
    });
  } catch (e) {
    console.error(`[ERROR] Student.Controller.updateStudent error: ${e}`);
    res
      .status(500)
      .json({ result: [], error: "Cannot update student with id ${id}" });
  }
};

module.exports = {
  getAllStudent,
  createStudent,
  getOneStudent,
  deleteStudent,
  updateStudent,
};
