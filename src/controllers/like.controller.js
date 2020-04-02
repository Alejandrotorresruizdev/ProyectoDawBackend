
const BaseController = require('./base.controller');

const responseFunctions = require("../utils/responseHttp.utils");

const {
  CODE_NOT_FOUND,
  CODE_OK,
  CODE_BAD_REQUEST,
  CODE_CREATED
} = require("../constants/httpCodes");

const {
  MESS_EMPTY_ID,
  MESS_ID_NOT_FOUND,
  MESS_OK_GET,
  MESS_OK_PUT,
  MESS_OK_POST
} = require("../constants/errorMessages");

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