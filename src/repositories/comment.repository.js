const BaseRepository = require("./base.repository");
const { User } = require("../models/index");
const { Post } = require("../models/index");

let _commentModel = null;
class CommentRepository extends BaseRepository {
  constructor({ Comment }) {
    super(Comment);
    _commentModel = Comment;
  }

  async getAllCommentsFromPost(id, offset , limit ) {
    const listPost = _commentModel
      .findAndCountAll({
        where: {
          postId:id
        },
        include: [
          {
            model: User,
            as: "user",
            attributes: ["id", "full_name", "usuario"],
          },
          {
            model: Post,
            as: "post",
            attributes: ["id", "titulo"],
          }
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
        return [];
      });

    return listPost;
  }
}

module.exports = CommentRepository;
