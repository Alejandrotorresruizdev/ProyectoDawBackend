const BaseService = require("./base.service");

let _likeRepository = null;

const responseFunctions = require("../utils/responseHttp.utils");

const {
  CODE_NOT_FOUND,
  CODE_OK
} = require("../constants/httpCodes");

const {
  MESS_EMPTY_ID,
  MESS_ID_NOT_FOUND,
  MESS_OK_GET,
} = require("../constants/errorMessages");

class LikeService extends BaseService {
  constructor({ LikeRepository }) {
    super(LikeRepository);
    _likeRepository = LikeRepository;
  }

  async getAllLikesFromPost(id) {
    if (responseFunctions.emptyId(id)) {
      return responseFunctions.error(CODE_NOT_FOUND, MESS_EMPTY_ID);
    }

    const allEntities = await _likeRepository.getAllLikesFromPost(id);


    if (responseFunctions.notFoundEntity(allEntities)) {
      return responseFunctions.error(CODE_NOT_FOUND, MESS_ID_NOT_FOUND);
    }

    return responseFunctions.error(CODE_OK, MESS_OK_GET, allEntities);
  }
}

module.exports = LikeService;
