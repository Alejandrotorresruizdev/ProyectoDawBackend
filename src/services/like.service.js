const BaseService = require("./base.service");

let _likeRepository = null;
let _postRepository = null;

const responseFunctions = require("../utils/responseHttp.utils");

const { CODE_NOT_FOUND, CODE_OK } = require("../constants/httpCodes");

const {
  MESS_EMPTY_ID,
  MESS_ID_NOT_FOUND,
  MESS_OK_GET
} = require("../constants/errorMessages");

class LikeService extends BaseService {
  
  constructor({ LikeRepository,PostRepository }) {
    super(LikeRepository);
    _likeRepository = LikeRepository;
    _postRepository = PostRepository;
  }

   async getAllLikesFromPost (id) {

    if (responseFunctions.emptyId(id)) return responseFunctions.error(CODE_NOT_FOUND, MESS_EMPTY_ID);
    
    const entity = await _postRepository.get(id);

    if (responseFunctions.notFoundEntity(entity)) return responseFunctions.error(CODE_NOT_FOUND, MESS_ID_NOT_FOUND);
  
    const allEntities = await _likeRepository.getAllLikesFromPost(id);

    return responseFunctions.error(CODE_OK, MESS_OK_GET, allEntities);
  }
}

module.exports = LikeService;
