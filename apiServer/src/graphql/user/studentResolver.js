const {
  getAllStudents,
  findOneStudent,
} = require("../../resources/student/student-db");

const studentResolver = {
  student: async (args) => {
    let students = [];
    if (args && args.idStudent != null) {
      students[0] = await findOneStudent(args.idStudent);
    } else {
      students = await getAllStudents();
    }

    return students;
  },
  hello: () => {
    return "Hello world!!!";
  },
};

module.exports = studentResolver;
