const BaseController = require("./base.controller");

let _userService = null;

class AdminController {
  constructor({ UserService }) {
    _userService = UserService;
  }

  async updateUser(req, res) {}

  async updatePassword(req, res) {}

  async updateAvatar(req, res) {}

  async updatePost(req, res) {}
}

module.exports = AdminController;
