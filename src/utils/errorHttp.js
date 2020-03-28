const errorsFunctions = {};

errorsFunctions.error = (statusCode, message,entity) => {
  const error = new Error();
  error.status = statusCode;
  error.message = message;
  error.body = entity;
  return error;
};

errorsFunctions.emptyId = id => {
  if (!id) {
    return true;
  }
  return false;
};

errorsFunctions.notFoundEntity = entity => {
  if (!entity) {
    return true;
  }
  return false;
};

module.exports = errorsFunctions;
