const BaseRepository = require("./base.repository");

let _postModel = null;
class PostRepository extends BaseRepository {
  constructor({ Post }) {
    super(Post);
    _postModel = Post;
  }

  async getPostByIdUser(id) {
    const listPost = _postModel
      .findAll({
        where: {
          usuarios_idusuarios: id
        }
      })
      .then(list => {
        return list;
      })
      .catch(err => {
        return false;
      });

    return listPost;
  }
}

module.exports = PostRepository;
