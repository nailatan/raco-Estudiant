const pool = require("../../pool-db");

const findAllDiariesSQL = `SELECT * FROM diary`;
const findOneDiarySQL = `${findAllDiariesSQL} WHERE idDiary = $1`;
const createOneDiarySQL = `INSERT INTO diary(name) VALUES ($1) RETURNING *`;
const updateOneDiarySQL = `UPDATE diary
                              SET name = $1
                            WHERE idDiary = $2
                            RETURNING *`;
const deleteOneDiarySQL = `DELETE FROM  diary WHERE idDiary = $1 RETURNING *`;

const findAllDiaries = async () => {
  const result = await pool.query(findAllDiariesSQL);
  return result.rows;
};

const findOneDiary = async (idDiary) => {
  const result = await pool.query(findOneDiarySQL, [idDiary]);
  return result.rows[0];
};

const createOneDiary = async (diaryInfo) => {
  const { name } = diaryInfo;
  const result = await pool.query(createOneDiarySQL, [name]);
  return result.rows[0];
};

const updateOneDiary = async (idDiary, diaryInfo) => {
  const { name } = diaryInfo;
  const result = await pool.query(updateOneDiarySQL, [name, idDiary]);
  return result.rows[0];
};

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
