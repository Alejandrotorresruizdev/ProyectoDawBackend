let _repository = null;

const errorsFunctions = require("../utils/errorHttp");

const {
  CODE_NOT_FOUND,
  CODE_OK,
  CODE_BAD_REQUEST,CODE_CREATED
} = require("../constants/httpCodes");

const {
  MESS_EMPTY_ID,
  MESS_ID_NOT_FOUND,
  MESS_OK_GET,
  MESS_OK_PUT,
  MESS_ERROR_PUT,
  MESS_DUPLICATE_EMAIL,
  MESS_DUPLICATE_USER
} = require("../constants/errorMessages");

class BaseService {
  constructor(repository) {
    _repository = repository;
  }

  async get(id) {
    if (errorsFunctions.emptyId(id)) {
      return errorsFunctions.error(CODE_NOT_FOUND, MESS_EMPTY_ID);
    }

    const currentEntity = await _repository.get(id);

    if (errorsFunctions.notFoundEntity(currentEntity)) {
      return errorsFunctions.error(CODE_NOT_FOUND, MESS_ID_NOT_FOUND);
    }

    return errorsFunctions.error(CODE_OK, MESS_OK_GET, currentEntity);
  }

  async getAll() {}

  async create(entity) {
    const entityCreated = await _repository.create(entity);

    if (entityCreated.status != CODE_OK) {
      //If email or user exists then return error

        return errorsFunctions.error(
          CODE_BAD_REQUEST,
          entityCreated.result
        );
    }

    return errorsFunctions.error(
      CODE_CREATED,
      entityCreated.result
    );
  }

  async update(id, idName, entity) {
    if (errorsFunctions.emptyId(id)) {
      return errorsFunctions.error(CODE_NOT_FOUND, MESS_EMPTY_ID);
    }

    const currentEntity = await _repository.get(id);

    if (errorsFunctions.notFoundEntity(currentEntity)) {
      return errorsFunctions.error(CODE_NOT_FOUND, MESS_ID_NOT_FOUND);
    }

    const updatedEntity = await _repository.update(id, entity, idName);

    if (updatedEntity) {
      return errorsFunctions.error(CODE_OK, MESS_OK_PUT, updatedEntity);
    }

    return errorsFunctions.error(CODE_NOT_FOUND, MESS_ERROR_PUT);
  }

  async delete() {}
}

module.exports = BaseService;
