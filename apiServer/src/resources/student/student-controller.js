const express = require("express");
const dbStudent = require("./student-db");
const dbPerson = require("../person/person-db");
const validations = require("../../functionsValidation");

const getAllStudent = async (req, res, next) => {
  try {
    const students = await dbStudent.getAllStudents();
    res.status(200).json({ result: students, error: " " });
  } catch (e) {
    next(e);
  }
};

const createStudent = async (req, res, next) => {
  try {
    const person = req.body;

    const errors = validateData(person);

    if (errors.length === 0) {
      const studentCreate = await dbStudent.insertOneStudent(person);

      res.status(201).json({
        result: [studentCreate],
        error: "",
      });
    } else {
      throw new Error(
        errors.reduce((previous, current) => `${previous} - ${current}`, "")
      );
    }
  } catch (e) {
    next(e);
  }
};

const getOneStudent = async (req, res, next) => {
  const id = req.params.idStudent;
  try {
    const student = await dbStudent.findOneStudent(id);
    if (student != null) {
      res.status(200).json({
        result: [student],
        error: "",
      });
    } else {
      throw new Error(`Cannot find student with id ${id}`);
    }
  } catch (e) {
    next(e);
  }
};

const deleteStudent = async (req, res, next) => {
  const id = req.params.idStudent;

  try {
    const studentDelete = await dbStudent.deleteOneStudent(id);
    if (studentDelete != null) {
      res.status(200).json({
        result: [studentDelete],
        error: "",
      });
    } else {
      throw new Error(`Cannot find student with id ${id}`);
    }
  } catch (e) {
    next(e);
  }
};

const updateStudent = async (req, res, next) => {
  const id = req.params.idStudent;
  const data = req.body;

  try {
    const errors = validateData(data);

    if (errors.length === 0) {
      const studentUpdated = await dbStudent.updateOneStudent(id, data);
      if (studentUpdated != null) {
        res.status(200).json({
          result: [studentUpdated],
          error: "",
        });
      } else {
        throw new Error(`Cannot find student with id ${id}`);
      }
    } else {
      throw new Error(
        errors.reduce((previous, current) => `${previous} - ${current}`, "")
      );
    }
  } catch (e) {
    next(e);
  }
};

const validateData = (student) => {
  const errors = [];

  if (
    !student.hasOwnProperty("firstName") ||
    !validations.hasValue(student.firstName)
  ) {
    errors.push("First name mandatory");
  }
  if (
    !student.hasOwnProperty("middleName") ||
    !validations.hasValue(student.middleName)
  ) {
    errors.push("Middle name mandatory");
  }
  if (!student.hasOwnProperty("admissionDate")) {
    errors.push("Admission date is mandatory");
  }
  return errors;
};

module.exports = {
  getAllStudent,
  createStudent,
  getOneStudent,
  deleteStudent,
  updateStudent,
};
