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
          status: 200,
          result: result
        };

        return response;
      })
      .catch(err => {
        const response = {
          status: 404,
          result: err.errors[0].path
        };
        
        return response;
      });
  }

  async update(id, entity, idName) {
    return await this.model
      .update(entity, { where: idName })
      .then(() => {
        const updatedEntity = this.model.findByPk(id);

        return updatedEntity;
      })
      .catch(() => {
        return null;
      });
  }

  async delete(id) {
    return await this.model.findByIdAndDelete(id);
  }
}

module.exports = BaseRepository;
