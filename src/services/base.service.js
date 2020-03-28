let _repository = null;

const errorsFunctions = require("../utils/errorHttp");

class BaseService {
  constructor(repository) {
    _repository = repository;
  }

  async get(id) {
    
    if(errorsFunctions.emptyId(id)){
      return errorsFunctions.error(400, "El id no puede ir vacío");
    }

    const currentEntity = await _repository.get(id);

    if(errorsFunctions.notFoundEntity(currentEntity)){
      return errorsFunctions.error(404, "La entidad no existe");
    }

    return currentEntity;
  }

  async getAll() {}

  async create() {}

  async update(id,idName,entity) {

    if(errorsFunctions.emptyId(id)){
      return errorsFunctions.error(400, "El id no puede ir vacío");
    }

    const currentEntity = await _repository.get(id);

    if(errorsFunctions.notFoundEntity(currentEntity)){
      return errorsFunctions.error(404, "La entidad no existe");
    }

    const updatedEntity = await _repository.update(id,entity,idName);

    if(updatedEntity){
      return errorsFunctions.error(200, "Entidad actualizada correctamente",updatedEntity);
    }

    return errorsFunctions.error(404, "Error en la actualización de la entidad");

  }

  async delete() {}
}

module.exports = BaseService;
