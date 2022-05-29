const express = require("express");
const dbStudent = require("./student-db");
const dbPerson = require("../person/person-db");

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

    const personCreate = await dbPerson.insertOnePerson(person);
    person.idStudent = personCreate.idperson;
    const studentCreate = await dbStudent.insertOneStudent(person);

    const student = { ...personCreate, ...studentCreate };
    delete student.idperson;

    res.status(201).json({
      result: student,
      error: "",
    });
  } catch (e) {
    console.error(`[ERROR} Student.Controller.create: ${e}`);
    res.status(500).json({ result: [], error: "Cannot create student" });
  }
};

const getOneStudent = async (req, res) => {
  const id = req.params.idStudent;
  try {
    const student = await dbStudent.findOneStudent(id);

    res.status(200).json({
      result: student,
      error: "",
    });
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

    const student = { ...personDelete, ...studentDelete };
    delete student.idperson;

    res.status(200).json({
      result: student,
      error: "",
    });
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
    const student = { ...personUpdated, ...studentUpdated };
    delete student.idperson;

    res.status(200).json({
      result: student,
      error: "",
    });
  } catch (e) {
    console.error(`[ERROR] Student.Controller.updateStudent error: ${e}`);
    res
      .status(500)
      .json({ result: [], error: `Cannot update student with id ${id}` });
  }
};

module.exports = {
  getAllStudent,
  createStudent,
  getOneStudent,
  deleteStudent,
  updateStudent,
};
