const BaseRepository = require("./base.repository");
const { CODE_OK, CODE_NOT_FOUND } = require("../constants/httpCodes");

let _user = null;

class UserRepository extends BaseRepository {
  constructor({ User }) {
    super(User);
    _user = User;
  }

  async updateUser(id, entity) {
    console.log(entity)
    return await this.model
      .update(entity, { where: { id: id } })
      .then(() => {
        const response = {
          status: CODE_OK,
          result: "Usuario actualizado correctamente"
        };

        return response;
      })
      .catch((err) => {
        console.log(err)
        const response = {
          status: CODE_NOT_FOUND,
          result: err.errors[0].path,
        };

        return response;
      });
  }

  async getUserByEmail(email) {
    const userEmail = await _user
      .findAll({
        where: {
          email: email,
        },
      })
      .then((succes) => {
        return succes;
      })
      .catch((error) => {
        return error;
      });

    return userEmail;
  }

  async getAllUsers(offset,limit) {
    const listPost = _user
    .findAndCountAll({
      offset: parseInt(offset),
      limit: parseInt(limit),
      attributes: { exclude: ["imagen", "password","updatedAt"] },
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
}

module.exports = UserRepository;
