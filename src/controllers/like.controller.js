
const BaseController = require('./base.controller');


class LikeController extends BaseController {
    constructor({LikeService}){
        super(LikeService)
    }
}




module.exports = LikeController;