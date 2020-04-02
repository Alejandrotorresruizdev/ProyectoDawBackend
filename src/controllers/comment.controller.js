
const BaseController = require('./base.controller');


class CommentController extends BaseController {

    constructor({CommentService}){
        super(CommentService)
    }
}


module.exports = CommentController;