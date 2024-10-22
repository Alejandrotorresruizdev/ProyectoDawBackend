const BaseRepository = require("./base.repository");
const { User } = require("../models/index");

let _postModel = null;
class PostRepository extends BaseRepository {
  constructor({ Post }) {
    super(Post);
    _postModel = Post;
  }

  async getPostById(id) {
    return await _postModel.findOne({
      where: {
        id: id,
      },
      attributes: { exclude: ["UserId", "userId"] },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "full_name", "usuario"],
        },
      ],
    });
  }

  async getPostByIdUser(id, offset, limit) {
    const listPost = _postModel
      .findAndCountAll({
        where: {
          userId: id,
        },
        attributes: { exclude: ["UserId", "userId"] },
        include: [
          {
            model: User,
            as: "user",
            attributes: ["id", "full_name", "usuario"],
          },
        ],
        offset: parseInt(offset),
        limit: parseInt(limit),
        order: [["createdAt", "DESC"]],
      })
      .then((list) => {
        console.log(list);
        return list;
      })
      .catch((err) => {
        return false;
      });

    return listPost;
  }

  async getPostByDate(offset, limit) {
    const listPost = _postModel
      .findAndCountAll({
        attributes: { exclude: ["UserId", "userId"] },
        include: [
          {
            model: User,
            as: "user",
            attributes: ["id", "full_name", "usuario"],
          },
        ],
        offset: parseInt(offset),
        limit: parseInt(limit),
        order: [["createdAt", "DESC"]],
      })
      .then((list) => {
        return list;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });

    return listPost;
  }
}

module.exports = PostRepository;
