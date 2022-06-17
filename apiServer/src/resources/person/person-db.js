//const pool = require("../../pool-db");

const insertOnePersonSQL = `INSERT INTO person (firstName, middleName, lastName, birthDate, adress, phone, mobile, email)
                             VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;
const updateOnePersonSQL = `UPDATE person 
                               SET firstName = $1, middleName=$2, lastName=$3, birthDate=$4, adress=$5, 
                                   phone=$6, mobile=$7, email=$8
                             WHERE idPerson = $9
                             RETURNING *`;
const deleteOnePersonSQL = `DELETE FROM person WHERE idPerson = $1 RETURNING *`;

const insertOnePerson = async (user, client) => {
  const {
    firstName,
    middleName,
    lastName,
    birthDate,
    address,
    phone,
    mobile,
    email,
  } = user;

  const result = await client.query(insertOnePersonSQL, [
    firstName,
    middleName,
    lastName,
    birthDate,
    address,
    phone,
    mobile,
    email,
  ]);
  return result.rows[0];
};

const updateOnePerson = async (idPerson, dataPerson, client) => {
  const {
    firstName,
    middleName,
    lastName,
    birthDate,
    address,
    phone,
    mobile,
    email,
  } = dataPerson;

  const result = await client.query(updateOnePersonSQL, [
    firstName,
    middleName,
    lastName,
    birthDate,
    address,
    phone,
    mobile,
    email,
    idPerson,
  ]);
  return result.rows[0];
};

const deleteOnePerson = async (idPerson, client) => {
  const result = await client.query(deleteOnePersonSQL, [idPerson]);
  return result.rows[0];
};

module.exports = { insertOnePerson, deleteOnePerson, updateOnePerson };
