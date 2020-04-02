const BaseController = require("./base.controller");

let _postService = null;

class PostController extends BaseController {
  constructor({ PostService }) {
    super(PostService);
    _postService = PostService;
  }

  async getPostByIdUser(req, res) {
    const { id } = req.params;
    const getPostByIdUser = await _postService.getPostByIdUser(id);

    res.send(getPostByIdUser);
  }
}

module.exports = PostController;
