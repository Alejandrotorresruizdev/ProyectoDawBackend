
class BaseController {
  contructor(service) {
    this._service = service;
  }

  async get(req, res) {
    const { id } = req.params;
    console.log(this._service)
    // const entity = await _service.get(id);
    // return res.send(entity);
  }
}

module.exports = BaseController;