let _userService = null;
const errorsFunctions = require("../utils/errorHttp");
const jwtFunctions = require("../utils/jwt");

const {
  CODE_OK,
  CODE_NOT_FOUND,
  CODE_CREATED,
  CODE_BAD_REQUEST
} = require("../constants/httpCodes");

const { MESS_OK_POST, MESS_ERROR_POST } = require("../constants/errorMessages");
const { compareSync, hashSync, genSaltSync } = require("bcryptjs");

class AuthService {
  constructor({ UserService }) {
    _userService = UserService;
  }

  //Cambiar por signUp
  async signIn(entity) {
    const entityCreated = await _userService.create(entity);

    if (entityCreated.status === CODE_BAD_REQUEST) {
      return errorsFunctions.error(
        CODE_BAD_REQUEST,
        MESS_ERROR_POST,
        entityCreated.message
      );
    }

    const generatedToken = await jwtFunctions.generateToken(
      entityCreated.message
    );

    return errorsFunctions.error(
      CODE_CREATED,
      MESS_OK_POST,
      entityCreated.message,
      generatedToken
    );
  }

  async signUp(body) {
    const loggedUser = await _userService.getUserByEmail(body.email);

    if (!loggedUser.length) {
      return errorsFunctions.error(
        CODE_NOT_FOUND,
        "Las credenciales son incorrectas",
        loggedUser
      );
    }

    const checkPassword = compareSync(body.password, loggedUser[0].password);

    if (checkPassword) {
      const generatedToken = await jwtFunctions.generateToken(loggedUser);

      return errorsFunctions.error(
        CODE_OK,
        "La credenciales son correctas",
        loggedUser,
        generatedToken
      );
    }

    return errorsFunctions.error(
      CODE_NOT_FOUND,
      "Las credenciales son incorrectas"
    );
  }
}

module.exports = AuthService;
