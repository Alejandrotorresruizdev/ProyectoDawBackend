const responseFunctions = {};

responseFunctions.error = (statusCode, message,entity,token) => {
  const error = new Error();
  error.status = statusCode;
  error.message = message;
  error.data = entity;
  error.token = token;
  return error;
};

responseFunctions.emptyId = id => {
  if (!id) {
    return true;
  }
  return false;
};

responseFunctions.notFoundEntity = entity => {
  if (!entity) {
    return true;
  }
  return false;
};

module.exports = responseFunctions;
