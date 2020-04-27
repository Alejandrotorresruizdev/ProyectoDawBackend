const responseFunctions = require("../utils/responseHttp.utils");

const {
  CODE_NOT_FOUND,
  CODE_OK,
  CODE_BAD_REQUEST,
  CODE_CREATED,
  CODE_UNAUTHORIZED,
} = require("../constants/httpCodes");

const {
  MESS_EMPTY_ID,
  MESS_ID_NOT_FOUND,
  MESS_OK_GET,
  MESS_OK_PUT,
  MESS_OK_POST,
} = require("../constants/errorMessages");

class BaseService {
  constructor(repository) {
    this.repository = repository;
  }

  async get(id) {
    if (responseFunctions.emptyId(id))
      return responseFunctions.error(CODE_NOT_FOUND, MESS_EMPTY_ID);

    const currentEntity = await this.repository.get(id);

    if (responseFunctions.notFoundEntity(currentEntity))
      return responseFunctions.error(CODE_NOT_FOUND, MESS_ID_NOT_FOUND);

    return responseFunctions.error(CODE_OK, MESS_OK_GET, currentEntity);
  }


  async create(entity) {
    const entityCreated = await this.repository.create(entity);

    if (entityCreated.status != CODE_OK)
      return responseFunctions.error(CODE_BAD_REQUEST, entityCreated.result);

    return await responseFunctions.error(
      CODE_CREATED,
      MESS_OK_POST,
      entityCreated.result
    );
  }

  async update(id, idEntity, entity) {
    if (responseFunctions.emptyId(idEntity))
      return responseFunctions.error(CODE_NOT_FOUND, MESS_EMPTY_ID);

    const currentEntity = await this.repository.get(idEntity);
    console.log(currentEntity.id);

    if (currentEntity.userId != id)
      return responseFunctions.error(CODE_UNAUTHORIZED, "No estas autorizado");

    if (responseFunctions.notFoundEntity(currentEntity))
      return responseFunctions.error(CODE_NOT_FOUND, MESS_ID_NOT_FOUND);

    const updatedEntity = await this.repository.update(idEntity, entity);

    if (updatedEntity)
      return responseFunctions.error(CODE_OK, MESS_OK_PUT, updatedEntity);
  }

  async delete(id, idEntity) {
    if (responseFunctions.emptyId(idEntity))
      return responseFunctions.error(CODE_NOT_FOUND, MESS_EMPTY_ID);

    const currentEntity = await this.repository.get(idEntity);

    if (currentEntity.userId != id)
      return responseFunctions.error(CODE_UNAUTHORIZED, "No estas autorizado");

    if (responseFunctions.notFoundEntity(currentEntity))
      return responseFunctions.error(CODE_NOT_FOUND, MESS_ID_NOT_FOUND);

    const deletedEntity = await this.repository.delete(idEntity);

    if (deletedEntity)
      return responseFunctions.error(CODE_OK, MESS_OK_PUT, deletedEntity);
  }
}

module.exports = BaseService;
