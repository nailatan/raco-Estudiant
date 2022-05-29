const pool = require("../../pool-db");

const queryGetAllStudentsSQL = `SELECT s.idStudent, p.firstName, p.middleName, p.lastName, p.birthDate, p.adress, p.phone, p.mobile, p.email,
                                       s.emailStudent, s.cip, s.admissionDate
                                  FROM student s 
                                  INNER JOIN person p ON p.idperson = s.idStudent`;
const getAllStudents = async () => {
  const result = await pool.query(queryGetAllStudentsSQL);
  return result.rows;
};

const insertOneStudentSQL = `INSERT INTO student (idStudent, emailStudent, cip, admissionDate)
                             VALUES($1, $2, $3, $4) RETURNING *`;
const insertOneStudent = async (student) => {
  const { idStudent, emailStudent, cip, admissionDate } = student;
  const result = await pool.query(insertOneStudentSQL, [
    idStudent,
    emailStudent,
    cip,
    admissionDate,
  ]);
  return result.rows[0];
};

const updateOneStudentSQL = `UPDATE student 
                         SET emailStudent = $1, cip = $2, admissionDate =$3
                        WHERE idStudent = $4
                        RETURNING *`;
const updateOneStudent = async (idStudent, student) => {
  const { emailStudent, cip, admissionDate } = student;
  const result = await pool.query(updateOneStudentSQL, [
    emailStudent,
    cip,
    admissionDate,
    idStudent,
  ]);
  return result.rows[0];
};

const findOneStudentSQL = `SELECT s.idStudent, p.firstName, p.middleName, p.lastName, p.birthDate, p.adress, p.phone, p.mobile, p.email,
                           s.emailStudent, s.cip, s.admissionDate
                           FROM student s 
                           INNER JOIN person p ON p.idperson = s.idStudent
                           WHERE s.idStudent = $1`;

const findOneStudent = async (idStudent) => {
  const result = await pool.query(findOneStudentSQL, [idStudent]);
  return result.rows[0];
};

const deleteOneStudentSQL = `DELETE FROM student WHERE idStudent = $1 RETURNING *`;

const deleteOneStudent = async (idStudent) => {
  const result = await pool.query(deleteOneStudentSQL, [idStudent]);
  return result.rows[0];
};

module.exports = {
  getAllStudents,
  insertOneStudent,
  findOneStudent,
  deleteOneStudent,
  updateOneStudent,
};
