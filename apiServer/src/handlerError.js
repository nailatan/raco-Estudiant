function handleError(err, req, res, next) {
  let msg = "Something was wrong";
  let httpCode = 500;
  console.log(`${err.code} - ${err}`);
  switch (err.code) {
    case undefined:
      msg = err.message;
      httpCode = 400;
      break;
    case "ECONNREFUSED":
      msg = "Unable to retrieve information";
      break;
    case "42P01":
      msg = "Dont exist entity";
      httpCode = 500;
      break;
    case "23505":
    case 11000:
      httpCode = 400;
      msg = `This data already exists`;
      break;
    case "23503":
      httpCode = 400;
      msg = `Cannot create what you want. Parent doesn't exist`;
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
