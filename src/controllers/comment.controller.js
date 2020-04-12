const BaseController = require("./base.controller");

let _commentService = null;

class CommentController extends BaseController {
  constructor({ CommentService }) {
    super(CommentService);
    _commentService = CommentService;
  }

  async getAllCommentsFromPost(req, res) {
    const { id } = req.params;
    const { offset,limit } = req.query
    const allEntities = await _commentService.getAllCommentsFromPost(id,offset,limit);
    res.send(allEntities);
  }
}

module.exports = CommentController;
