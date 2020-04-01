
class BaseController {
  constructor(service) {

    this.service = service;
  }

  async get(req, res) {
    const { id } = req.params;
    // const entity = await this.service.get(id);
    console.log(this.service)
    return res.send(id);
  }
}

module.exports = BaseController;