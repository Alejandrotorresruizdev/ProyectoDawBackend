const BaseService = require("./base.service");

let _commentRepository = null;
let _postRepository = null;
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

  
class CommentService extends BaseService {

  constructor({ CommentRepository,PostRepository }) {
    super(CommentRepository);
    _commentRepository = CommentRepository;
    _postRepository = PostRepository;
  }

  async getAllCommentsFromPost(id,offset,limit) {

    if (responseFunctions.emptyId(id)) return responseFunctions.error(CODE_NOT_FOUND, MESS_EMPTY_ID);

    const entity = await _postRepository.get(id);

    if (responseFunctions.notFoundEntity(entity)) return responseFunctions.error(CODE_NOT_FOUND, MESS_ID_NOT_FOUND);

    const allEntities = await _commentRepository.getAllCommentsFromPost(id,offset,limit);

    return responseFunctions.error(CODE_OK, MESS_OK_GET, allEntities);
  }
}

module.exports = CommentService;
