const BaseRepository = require("./base.repository");

let _postModel = null;
class PostRepository extends BaseRepository {
  constructor({ Post }) {
    super(Post);
    _postModel = Post;
  }

  paginate = ({ page, pageSize }) => {
    const offset = page * pageSize;
    const limit = pageSize;
  
    return {
      offset,
      limit,
    };
  };
  
  

  async getPostByIdUser(id, pageSize = 5) {

    const listPost = _postModel
      .findAndCountAll({
        where: {
          usuarios_idusuarios: id
        },
        limit:pageSize,
        offset:10
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