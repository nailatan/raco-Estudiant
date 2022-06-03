const express = require("express");
const dbStudent = require("./student-db");
const dbPerson = require("../person/person-db");
const validations = require("../../functionsValidation");

const getAllStudent = async (req, res) => {
  try {
    const students = await dbStudent.getAllStudents();
    res.status(200).json({ result: students, error: " " });
  } catch (e) {
    console.error(`[ERROR] Student.Controller.getAll : ${e}`);
    res.status(500).json({ result: [], error: "Cannot get list of Students" });
  }
};

const createStudent = async (req, res) => {
  try {
    const person = req.body;

    const errors = validateData(person);

    if (errors.length === 0) {
      const personCreate = await dbPerson.insertOnePerson(person);
      person.idStudent = personCreate.idperson;
      const studentCreate = await dbStudent.insertOneStudent(person);

      const student = { ...personCreate, ...studentCreate };
      delete student.idperson;

      res.status(201).json({
        result: [student],
        error: "",
      });
    } else {
      res.status(400).json({
        result: [],
        error: errors,
      });
    }
  } catch (e) {
    console.error(`[ERROR} Student.Controller.create: ${e}`);
    res.status(500).json({ result: [], error: "Cannot create student" });
  }
};

const getOneStudent = async (req, res) => {
  const id = req.params.idStudent;
  try {
    const student = await dbStudent.findOneStudent(id);
    if (student != null) {
      res.status(200).json({
        result: [student],
        error: "",
      });
    } else {
      res
        .status(404)
        .json({ result: {}, error: `Cannot find student with id ${id}` });
    }
  } catch (e) {
    console.error(`[ERROR] Student.Controller.Get error: ${e}`);
    res
      .status(500)
      .json({ result: [], error: `Cannot get student with id ${id}` });
  }
};

const deleteStudent = async (req, res) => {
  const id = req.params.idStudent;

  try {
    const studentDelete = await dbStudent.deleteOneStudent(id);
    const personDelete = await dbPerson.deleteOnePerson(id);
    if (studentDelete != null && personDelete != null) {
      const student = { ...personDelete, ...studentDelete };
      delete student.idperson;

      res.status(200).json({
        result: [student],
        error: "",
      });
    } else {
      res
        .status(404)
        .json({ result: {}, error: `Cannot find student with id ${id}` });
    }
  } catch (e) {
    console.error(`[ERROR] Student.Controller.deleteStudent error: ${e}`);
    res
      .status(500)
      .json({ result: [], error: `Cannot delete student with id ${id}` });
  }
};

const updateStudent = async (req, res) => {
  const id = req.params.idStudent;
  const data = req.body;

  try {
    const studentUpdated = await dbStudent.updateOneStudent(id, data);
    const personUpdated = await dbPerson.updateOnePerson(id, data);
    if (studentUpdated != null && personUpdated != null) {
      const student = { ...personUpdated, ...studentUpdated };
      delete student.idperson;

      res.status(200).json({
        result: [student],
        error: "",
      });
    } else {
      res
        .status(404)
        .json({ result: [], error: `Cannot find student with id ${id}` });
    }
  } catch (e) {
    console.error(`[ERROR] Student.Controller.updateStudent error: ${e}`);
    res
      .status(500)
      .json({ result: [], error: `Cannot update student with id ${id}` });
  }
};

const validateData = (student) => {
  const errors = [];
  console.log(student.hasOwnProperty("firstName"));
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
