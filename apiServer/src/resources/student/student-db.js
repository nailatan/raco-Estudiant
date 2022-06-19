const pool = require("../../pool-db");
const dbPerson = require("../person/person-db");

const queryGetAllStudentsSQL = `SELECT s.idStudent, p.firstName, p.middleName, p.lastName, to_char(p.birthDate, 'YYYY-MM-DD') as birthDate, p.adress, p.phone, p.mobile, p.email,
                                       s.emailStudent, s.cip, to_char(s.admissionDate, 'YYYY-MM-DD') as admissionDate
                                  FROM student s 
                                  INNER JOIN person p ON p.idperson = s.idStudent`;

const findOneStudentSQL = `${queryGetAllStudentsSQL} WHERE s.idStudent = $1`;

const insertOneStudentSQL = `INSERT INTO student (idStudent, emailStudent, cip, admissionDate)
                             VALUES($1, $2, $3, $4) RETURNING *`;

const updateOneStudentSQL = `UPDATE student 
                                SET emailStudent = $1, cip = $2, admissionDate =$3
                              WHERE idStudent = $4
                            RETURNING *`;

const deleteOneStudentSQL = `DELETE FROM student WHERE idStudent = $1 RETURNING *`;

const getAllStudents = async () => {
  const result = await pool.query(queryGetAllStudentsSQL);
  return result.rows;
};

const insertOneStudent = async (student) => {
  const { emailStudent, cip, admissionDate } = student;
  let studentCompose = {};
  const client = await pool.connect();
  try {
    client.query("BEGIN");
    const personCreate = await dbPerson.insertOnePerson(student, client);
    const idStudent = personCreate.idperson;
    const result = await client.query(insertOneStudentSQL, [
      idStudent,
      emailStudent,
      cip,
      admissionDate,
    ]);

    const studentCreate = result.rows[0];

    studentCompose = { ...personCreate, ...studentCreate };
    delete studentCompose.idperson;
    await client.query("COMMIT");
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    await client.release();
  }
  console.log(studentCompose);
  return studentCompose;
};

const updateOneStudent = async (idStudent, student) => {
  let studentComplete = {};
  const { emailStudent, cip, admissionDate } = student;
  const client = await pool.connect();

  try {
    client.query("BEGIN");
    const personUpdated = await dbPerson.updateOnePerson(
      idStudent,
      student,
      client
    );
    const result = await client.query(updateOneStudentSQL, [
      emailStudent,
      cip,
      admissionDate,
      idStudent,
    ]);
    const studentUpdate = result.rows[0];
    studentComplete = { ...personUpdated, ...studentUpdate };
    delete student.idperson;
    client.query("COMMIT");
  } catch (e) {
    client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
  return studentComplete;
};

const findOneStudent = async (idStudent) => {
  const result = await pool.query(findOneStudentSQL, [idStudent]);
  return result.rows[0];
};

const deleteOneStudent = async (idStudent) => {
  let studentComplete = {};
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const result = await client.query(deleteOneStudentSQL, [idStudent]);
    const studentDelete = result.rows[0];

    const personDelete = await dbPerson.deleteOnePerson(idStudent, client);

    studentComplete = { ...personDelete, ...studentDelete };
    delete studentComplete.idperson;

    await client.query("COMMIT");
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    await client.release();
  }
  return studentComplete;
};

module.exports = {
  getAllStudents,
  findOneStudent,
  deleteOneStudent,
  updateOneStudent,
  insertOneStudent,
};
