const errorsFunctions = {};

errorsFunctions.error = (statusCode, message,entity,token) => {
  const error = new Error();
  error.status = statusCode;
  error.message = message;
  error.body = entity;
  error.token = token;
  return error;
};

errorsFunctions.emptyId = id => {
  if (!id) {
    return true;
  }
  return false;
};

errorsFunctions.notFoundEntity = entity => {
  if (!entity || entity.length) {
    return true;
  }
  return false;
};

module.exports = errorsFunctions;
