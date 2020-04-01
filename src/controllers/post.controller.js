const BaseController = require("./base.controller");

let _postService = null;

class PostController {
  constructor({ PostService }) {
    _postService = PostService;

  }

  

 
   get  = async (req, res) => {
    const {id} = req.params;
    const getPost = await _postService.get(id);
    res.status(getPost.status).send(getPost);
  }

  async getPostByIdUser(req, res) {
    const { id } = req.params;
    const getPostByIdUser = await _postService.getPostByIdUser(id);

    res.send(getPostByIdUser);
  }

  async getAll(req, res) {}

  async create(req, res) {
    const entity = req.body;
    const postCreated = await _postService.create(entity);
    res.status(postCreated.status).send(postCreated);
  }

  async update(req, res) {}
}

module.exports = PostController;
