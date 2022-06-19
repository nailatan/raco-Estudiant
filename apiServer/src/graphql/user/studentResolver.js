const {
  getAllStudents,
  findOneStudent,
  insertOneStudent,
  deleteOneStudent,
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
  createStudent: async (args) => {
    const studentInput = args.student;
    const student = await insertOneStudent(studentInput);
    return student;
  },
  deleteStudent: async ({ idStudent }) => {
    const student = await deleteOneStudent(idStudent);
    return student;
  },
  hello: () => {
    return "Hello world!!!";
  },
};

module.exports = studentResolver;
