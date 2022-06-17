const pool = require("../../pool-db");

const findAllEventsSQL = `SELECT idEvent, idDiary, name, description, to_char(startdate, 'YYYY-MM-DD HH24:MI:SS') as startDate, to_char(enddate, 'YYYY-MM-DD HH24:MI:SS') as endDate FROM events WHERE idDiary = $1`;
const findOneEventsSQL = `SELECT idEvent, idDiary, name, description, to_char(startdate, 'YYYY-MM-DD HH24:MI:SS') as startdate, to_char(enddate, 'YYYY-MM-DD HH24:MI:SS') as endDate FROM events WHERE idEvent = $1`;
const createOneEventSQL = `INSERT INTO events(name, description, startDate, endDate, idDiary)VALUES ($1, $2,$3, $4, $5) RETURNING *`;
const updateOneEventSQL = `UPDATE events 
                              SET name  = $1, 
                                  description = $2, 
                                  startDate =$3, 
                                  endDate = $4
                             WHERE idEvent = $5 
                             RETURNING *`;
const deleteOneEventsSQL = `DELETE FROM events WHERE idEvent = $1 RETURNING *`;

const findAllEvents = async (idDiary) => {
  const result = await pool.query(findAllEventsSQL, [idDiary]);
  return result.rows;
};

const findOneEvents = async (idEvent) => {
  const result = await pool.query(findOneEventsSQL, [idEvent]);
  return result.rows[0];
};

const createOneEvent = async (idDiary, eventData) => {
  const { name, description, startDate, endDate } = eventData;
  const result = await pool.query(createOneEventSQL, [
    name,
    description,
    startDate,
    endDate,
    idDiary,
  ]);
  return result.rows[0];
};

const updateOneEvent = async (idEvent, eventData) => {
  const { name, description, startDate, endDate } = eventData;
  const result = await pool.query(updateOneEventSQL, [
    name,
    description,
    startDate,
    endDate,
    idEvent,
  ]);
  return result.rows[0];
};

const deleteOneEvents = async (idEvent) => {
  const result = await pool.query(deleteOneEventsSQL, [idEvent]);
  return result.rows[0];
};

module.exports = {
  findAllEvents,
  createOneEvent,
  updateOneEvent,
  findOneEvents,
  deleteOneEvents,
};
