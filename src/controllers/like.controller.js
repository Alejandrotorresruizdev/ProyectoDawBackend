
const BaseController = require('./base.controller');

let _likeService = null;

class LikeController extends BaseController {
    constructor({LikeService}){
        super(LikeService)
        _likeService = LikeService;
    }

    async getAllLikesFromPost(req,res) {
        const { id } = req.params;
        const allEntities = await _likeService.getAllLikesFromPost(id);
        res.send(allEntities);
    }

}




module.exports = LikeController;