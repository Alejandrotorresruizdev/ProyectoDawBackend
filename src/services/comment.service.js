const BaseService = require("./base.service");

let _commentRepository = null;

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

  constructor({ CommentRepository }) {
    super(CommentRepository);
    _commentRepository = CommentRepository;
  }

  async getAllCommentsFromPost(id) {

    if (responseFunctions.emptyId(id)) return responseFunctions.error(CODE_NOT_FOUND, MESS_EMPTY_ID);

    const entity = await _commentRepository.get(id);

    if (responseFunctions.notFoundEntity(entity)) return responseFunctions.error(CODE_NOT_FOUND, MESS_ID_NOT_FOUND);

    const allEntities = await _commentRepository.getAllCommentsFromPost(id);

    return responseFunctions.error(CODE_OK, MESS_OK_GET, allEntities);
  }
}

module.exports = CommentService;
