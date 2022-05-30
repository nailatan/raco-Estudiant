const pool = require("../../pool-db");

const findAllDiariesSQL = `SELECT * FROM diary`;
const findAllDiaries = async () => {
  const result = await pool.query(findAllDiariesSQL);
  return result.rows;
};

const findOneDiarySQL = `SELECT * FROM diary WHERE idDiary = $1`;
const findOneDiary = async (idDiary) => {
  const result = await pool.query(findOneDiarySQL, [idDiary]);
  return result.rows[0];
};

const createOneDiarySQL = `INSERT INTO diary(name) VALUES ($1)
                            RETURNING *`;
const createOneDiary = async (diaryInfo) => {
  const { name } = diaryInfo;
  const result = await pool.query(createOneDiarySQL, [name]);
  return result.rows[0];
};

const updateOneDiarySQL = `UPDATE diary
                              SET name = $1
                            WHERE idDiary = $2
                            RETURNING *`;
const updateOneDiary = async (idDiary, diaryInfo) => {
  const { name } = diaryInfo;
  const result = await pool.query(updateOneDiarySQL, [name, idDiary]);
  return result.rows[0];
};

const deleteOneDiarySQL = `DELETE FROM  diary
                            WHERE idDiary = $1
                            RETURNING *`;
const deleteOneDiary = async (idDiary) => {
  const result = await pool.query(deleteOneDiarySQL, [idDiary]);
  return result.rows[0];
};

module.exports = {
  findAllDiaries,
  findOneDiary,
  createOneDiary,
  updateOneDiary,
  deleteOneDiary,
};
