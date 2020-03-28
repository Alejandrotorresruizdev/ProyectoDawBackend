const BaseController = require('./base.controller');
let _userService = null;

class UserController{

    constructor({ UserService }) {
        _userService = UserService
    }

    async get(req, res) {
        const { id } = req.params;
        const user = await _userService.get(id);

        return res.send(user);
    }

    async update (req,res){
        const {idusuario} = req.params;
        const entity = req.body;
        const userUpdated = await _userService.update(idusuario,req.params,entity);
        
        return await res.status(userUpdated.status).send(userUpdated);
    }

}

module.exports = UserController;