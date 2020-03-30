let _userService = null;
const errorsFunctions = require("../utils/errorHttp");
const jwtFunctions = require("../utils/jwt");
const mailerFunctions = require("../utils/mailer.utils");

const {
  CODE_OK,
  CODE_NOT_FOUND,
  CODE_CREATED,
  CODE_BAD_REQUEST
} = require("../constants/httpCodes");

const {
  MESS_OK_POST,
  MESS_ERROR_POST,
  MESS_ID_NOT_FOUND
} = require("../constants/errorMessages");
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

  async recoveryPassword(email) {
    if (errorsFunctions.emptyId(email)) {
      return errorsFunctions.error(CODE_NOT_FOUND, MESS_EMPTY_ID);
    }

    const currentEntity = await _userService.getUserByEmail(email);

    if (errorsFunctions.notFoundEntity(currentEntity.length)) {
      return errorsFunctions.error(CODE_NOT_FOUND, MESS_ID_NOT_FOUND);
    }

    const recoveryPassword = await mailerFunctions.send("54544545",currentEntity[0].email);
    console.log(recoveryPassword)

    if(recoveryPassword){
      return "Contraseña restablecida"
    }else{
      return "Contraseña no restablecida"
    }
    return recoveryPassword;
  }
}

module.exports = AuthService;
