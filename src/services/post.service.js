const BaseService = require("./base.service");

const responseFunctions = require("../utils/responseHttp.utils");

const {
  CODE_NOT_FOUND,
  CODE_OK
} = require("../constants/httpCodes");

const {
  MESS_EMPTY_ID,
  MESS_ID_NOT_FOUND,
  MESS_OK_GET
} = require("../constants/errorMessages");

let _postRepository = null;

class PostService extends BaseService  {
  constructor({ PostRepository }) {
    super(PostRepository);
    _postRepository = PostRepository;
  }

  async getPostByIdUser(id) {
    
    if (responseFunctions.emptyId(id)) {
        return responseFunctions.error(CODE_NOT_FOUND, MESS_EMPTY_ID);
      }
  
      const currentEntity = await _postRepository.getPostByIdUser(id);

      if(currentEntity === []){
        return responseFunctions.error(CODE_NOT_FOUND, MESS_ID_NOT_FOUND);
      }
  
      return responseFunctions.error(CODE_OK, MESS_OK_GET, currentEntity);
  }
}

module.exports = PostService;