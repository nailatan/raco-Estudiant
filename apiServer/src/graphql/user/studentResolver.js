const { getAllStudents } = require("../../resources/student/student-db");

const studentResolver = {
  student: async () => {
    const students = await getAllStudents();
    return students;
  },
  hello: () => {
    return "Hello world!!!";
  },
};

module.exports = studentResolver;
