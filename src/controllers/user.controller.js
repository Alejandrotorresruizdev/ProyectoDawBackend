const BaseController = require('./base.controller');
let _userService = null;

class UserController  {

    constructor({ UserService }) {
        _userService = UserService
    }

    async get(req, res) {
        const { id } = req.params;
        const user = await _userService.get(id);

        return res.send(user);
    }
}

module.exports = UserController;