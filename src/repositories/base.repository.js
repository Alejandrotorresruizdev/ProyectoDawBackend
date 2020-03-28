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
    return await this.model.create(entity);
  }

  async update(id, entity, idName) {
    return await this.model
      .update(entity, { where: idName})
      .then(() => {
        const updatedEntity = this.model.findByPk(5);

        return updatedEntity;
      })
      .catch(err => {
        return null;
      });
  }

  async delete(id) {
    return await this.model.findByIdAndDelete(id);
  }
}

module.exports = BaseRepository;
