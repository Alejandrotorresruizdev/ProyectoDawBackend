let _repository = null;

const errorHttp = require("../utils/errorHttp");

class BaseService {
  constructor(repository) {
    _repository = repository;
  }

  async get(id) {
    if (!id) {
      return errorHttp(400, "El id no puede ir vacío");
    }

    const currentEntity = await _repository.get(id);

    if (!currentEntity) {
      return errorHttp(404, "El id no existe");
    }

    return currentEntity;
  }

  async getAll() {}

  async create() {}

  async update() {}

  async delete() {}
}

module.exports = BaseService;
