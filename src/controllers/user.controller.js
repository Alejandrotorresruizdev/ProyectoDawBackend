let _userService = null;

class UserController {
  constructor({ UserService }) {
    _userService = UserService;
  }

  async get(req, res) {
    const { id } = req;
    console.log(id);
    const user = await _userService.get(id);
    return await res.status(200).send(user);
  }

  async create(req, res) {
    const userCreated = await _userService.create(req.body);
    return res.status(200).send(userCreated);
  }

  async update(req, res) {
    const { idusuario } = req.params;
    const entity = req.body;
    const userUpdated = await _userService.update(idusuario, entity);

    return await res.status(userUpdated.status).send(userUpdated);
  }
}

module.exports = UserController;
