const BaseService = require('./base.service');


class CommentService extends BaseService {

    constructor({CommentRepository}){
            super(CommentRepository)
    }
}

module.exports = CommentService;