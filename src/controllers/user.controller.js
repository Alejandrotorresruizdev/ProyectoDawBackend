const BaseController = require("./base.controller");
let _userService = null;

class UserController {
  constructor({ UserService }) {
    _userService = UserService;
  }

  async get(req, res) {
    const { id } = req.params;
    console.log(_userService)
    const user = await _userService.get(id);

    return res.send(user);
  }

  async create(req, res) {
    const userCreated = await _userService.create(req.body);
    return res.status(200).send(userCreated);
  }

  async update(req, res) {
    const { idusuario } = req.params;
    const entity = req.body;
    const userUpdated = await _userService.update(
      idusuario,
      req.params,
      entity
    );

    return await res.status(userUpdated.status).send(userUpdated);
  }
}

module.exports = UserController;
