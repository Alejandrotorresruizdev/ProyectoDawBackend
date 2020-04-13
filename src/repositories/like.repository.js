const BaseRepository = require("./base.repository");
const { User } = require("../models/index");
let _likeModel = null;

class LikeRepository extends BaseRepository {
  constructor({ Likes}) {
    super(Likes);
    _likeModel = Likes;
  }

  async getAllLikesFromPost(id) {
    const listPost = _likeModel
    .findAndCountAll({
      where: {
        postId: id,
      },
      attributes: { exclude: ['UserId','userId','PostId','updatedAt'] },
      include: [{ model: User, as: "user",attributes: [ 'id', 'full_name', 'usuario' ] }],
      order: [
        ['createdAt', 'DESC'],
    ],
    })
    .then((list) => {
      return list;
    })
    .catch((err) => {
      return false;
    });

  return listPost;
  }
}

module.exports = LikeRepository;
