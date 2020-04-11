const BaseRepository = require("./base.repository");

let _user = null;

class UserRepository extends BaseRepository {
  constructor({ User }) {
    super(User);
    _user = User;
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
}

module.exports = UserRepository;
