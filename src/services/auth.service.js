let _userService = null;
const errorsFunctions = require("../utils/errorHttp");

const {
  CODE_NOT_FOUND,
  CODE_CREATED,
  CODE_BAD_REQUEST
} = require("../constants/httpCodes");

const {
  MESS_EMPTY_ID,
  MESS_ID_NOT_FOUND,
  MESS_OK_GET,
  MESS_OK_PUT,
  MESS_ERROR_PUT,
  MESS_DUPLICATE_EMAIL,
  MESS_DUPLICATE_USER
} = require("../constants/errorMessages");

class AuthService {
  constructor({ UserService }) {
    _userService = UserService;
  }

  async signIn(entity) {
    const entityCreated = await _userService.create(entity);

    if(entityCreated.status === CODE_BAD_REQUEST){
       return errorsFunctions.error(CODE_BAD_REQUEST,entityCreated.message);
    }

    return errorsFunctions.error(CODE_CREATED,entityCreated.message);
  }
}

module.exports = AuthService;
