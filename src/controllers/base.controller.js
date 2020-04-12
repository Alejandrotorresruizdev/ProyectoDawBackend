class BaseController {
  constructor(service) {
    this.service = service;
  }

  get = async (req, res) => {
    const { id } = req.params;
    const getEntity = await this.service.get(id);
    res.status(getEntity.status).send(getEntity);
  };

  create = async (req, res) => {
    const { id } = req;
    const entity = req.body;
    entity.usuarios_idusuarios = id;
    const entityCreated = await this.service.create(entity);
    res.status(200).send(entityCreated);
  };

  update = async (req, res) => {
    const { id } = req;
    const { idEntity } = req.params;
    const entity = req.body;
    const entityUpdated = await this.service.update(id, idEntity, entity);
    res.status(entityUpdated.status).send(entityUpdated);
  };
}

module.exports = BaseController;
