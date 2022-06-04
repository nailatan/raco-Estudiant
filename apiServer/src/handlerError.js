function handleError(err, req, res, next) {
  let msg = "Something was wrong";
  let httpCode = 500;
  console.log(`${err}`);
  switch (err.code) {
    case "ECONNREFUSED":
      msg = "Unable to retrieve information";
      break;
    case "23505":
      httpCode = 400;
      msg = `Duplicate ${err.entity}`;
      break;
    case "23503":
      httpCode = 400;
      msg = `Cannot create ${err.entity}. Parent doesn't exist`;
      break;
    case "23502":
      httpCode = 400;
      msg = `Required field missing.`;
      break;
    default:
      httpCode = err.code ? err.code : 500;
      msg = err.message;
  }
  res.status(httpCode).send({ result: [], error: msg });
}

module.exports = handleError;
