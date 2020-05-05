const BaseController = require("./base.controller");

let _postService = null;

class PostController extends BaseController {
  constructor({ PostService }) {
    super(PostService);
    _postService = PostService;
  }


  async getPostById(req, res){
    const { id } = req.params;
    const getEntity = await _postService.getPostById(id);
    res.status(getEntity.status).send(getEntity);
  }

  async createPost(req, res){
    const { id } = req;
    const {body,files} = req;
    const newPost = JSON.parse(body.post);
    const file = files ? files.files : null;
    newPost.userId = id;
    const createdPost = await _postService.createPost(newPost,file);

    return res.status(createdPost.status).send(createdPost);

  }

  async getPostByIdUser(req, res) {
    const { id } = req.params;
    const { offset,limit } = req.query;
    const getPostByIdUser = await _postService.getPostByIdUser(id,offset,limit);
    res.status(getPostByIdUser.status).send(getPostByIdUser);
  }

  async getPostByDate(req, res) {
    const { offset,limit } = req.query;
    const getPostByDate = await _postService.getPostByDate(offset,limit);
    res.status(getPostByDate.status).send(getPostByDate);
  }
}

module.exports = PostController;
