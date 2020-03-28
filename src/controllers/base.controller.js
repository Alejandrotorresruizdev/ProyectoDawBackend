
class BaseController {
  constructor(service) {
    this._service = service;
  }

  async get(req, res) {
    const { id } = req.params;
    const entity = await this._service.get(id);
    return res.send(entity);
  }
}

module.exports = BaseController;