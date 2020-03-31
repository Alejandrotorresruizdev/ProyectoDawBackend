const { CODE_OK, CODE_NOT_FOUND } = require("../constants/httpCodes");

let _model = null;

class BaseRepository {
  constructor(model) {
    _model = model;
  }

  async get(id) {
    console.log(_model)
    return await _model.findByPk(id);
  }

  async getAll() {
    return await _model.findAll();
  }

  async create(entity) {
    return await _model
      .create(entity, { isNewRecord: true })
      .then(result => {
        const response = {
          status: CODE_OK,
          result: result
        };

        return response;
      })
      .catch(err => {
        const response = {
          status: CODE_NOT_FOUND,
          result: err.errors[0].path
        };

        return response;
      });
  }

  async update(id, entity) {
    return await _model
      .update(entity, { where: { id: id } })
      .then(() => {
        const updatedEntity = _model.findByPk(id);

        return updatedEntity;
      })
      .catch(() => {
        return null;
      });
  }

  async delete(id) {
    return await _model.findByIdAndDelete(id);
  }
}

module.exports = BaseRepository;
