const BaseController = require("./base.controller");

let _userService = null;

class AdminController {
  constructor({ UserService }) {
    _userService = UserService;
  }

   async updateUser(req, res) {
    const { id } = req.params;
    const entity = req.body;
    const entityUpdated = await _userService.updateUser(id, entity);
    res.status(entityUpdated.status).send(entityUpdated);
  }

  async updatePassword(req, res) {
    const { id } = req.params;
    const { newPassword } = req.body;
    const entityUpdated = await _userService.updatePassword(id, newPassword);
    res.status(entityUpdated.status).send(entityUpdated);
  }

}

module.exports = AdminController;
