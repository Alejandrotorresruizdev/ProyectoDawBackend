const { CODE_OK, CODE_NOT_FOUND } = require("../constants/httpCodes");


class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async get(id) {
    return await this.model.findByPk(id);
  }

  async getAll() {
    return await this.model.findAll();
  }

  async create(entity) {
    return await this.model
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
          result: err
        };
        console.log(err)
        return response;
      });
  }

  async update(id, entity) {
    return await this.model
      .update(entity, { where: { id: id } })
      .then(() => {
        const updatedEntity = this.model.findByPk(id);

        return updatedEntity;
      })
      .catch((err) => {
        console.log(err.errors[0].path)
        return false;
      });
  }

  async delete(id) {
    return await this.model
    .destroy({ where: { id: id } })
    .then(() => {
      return {status:200};
    })
    .catch(() => {
      return false;
    });
  }
}

module.exports = BaseRepository;
