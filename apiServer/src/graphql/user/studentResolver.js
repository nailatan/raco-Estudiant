const { getAllStudents } = require("../../resources/student/student-db");

const studentResolver = {
  student: () => {
    const students = getAllStudents();
    return students;
  },
  hello: () => {
    return "Hello world!!!";
  },
};

module.exports = studentResolver;
