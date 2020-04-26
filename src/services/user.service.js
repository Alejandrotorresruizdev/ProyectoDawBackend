const BaseService = require("./base.service");

const responseFunctions = require("../utils/responseHttp.utils");
const jwtFunctions = require("../utils/jwt");

const {
  CODE_NOT_FOUND,
  CODE_OK,
  CODE_BAD_REQUEST,
} = require("../constants/httpCodes");

const {
  MESS_EMPTY_ID,
  MESS_ID_NOT_FOUND,
  MESS_OK_PUT,
  MESS_ERROR_PUT,
} = require("../constants/errorMessages");

let _userRepository = null;

class UserService extends BaseService {
  constructor({ UserRepository }) {
    super(UserRepository);
    this.userRepository = UserRepository;
  }

  async updateUser(id, entity) {
    if (responseFunctions.emptyId(id))
      return responseFunctions.error(CODE_NOT_FOUND, MESS_EMPTY_ID);

    if (responseFunctions.notFoundEntity(id))
      return responseFunctions.error(CODE_NOT_FOUND, MESS_ID_NOT_FOUND);

    const updatedEntity = await this.repository.updateUser(id, entity);

    if (updatedEntity.status === CODE_OK) {
      return responseFunctions.error(CODE_OK, MESS_OK_PUT, updatedEntity);
    }

    if(updatedEntity.status === CODE_NOT_FOUND) {
      let errorMsg;
      if (updatedEntity.result == "usuario_UNIQUE")
        errorMsg = "El nombre de usuario ya esta en uso";
      if (updatedEntity.result == "email_UNIQUE")
        errorMsg = "El nombre del email ya esta en uso";

      return await responseFunctions.error(
        CODE_BAD_REQUEST,
        MESS_ERROR_PUT,
        errorMsg
      );
    }

    return responseFunctions.error(
      CODE_BAD_REQUEST,
      MESS_ERROR_PUT,
      updatedEntity
    );
  }

  async updateAvatar(id, avatar) {
    if (responseFunctions.emptyId(id))
      return responseFunctions.error(CODE_NOT_FOUND, MESS_EMPTY_ID);

    if (responseFunctions.notFoundEntity(id))
      return responseFunctions.error(CODE_NOT_FOUND, MESS_ID_NOT_FOUND);

    const entity ={
      imagen : null
    };

    if (avatar) {
      try {
        const dateName = Date.now();
        avatar.mv(`./uploads/${dateName}.jpg`);
        entity.imagen = `/uploads/${dateName}.jpg`;
      } catch (error) {
        console.error(error);
      }
    } else {
      return responseFunctions.error(
        CODE_NOT_FOUND,
        "Debes de enviar una imagen",
        updatedEntity
      );
    }

    const updatedEntity = await this.repository.updateUser(id, entity);

    if (updatedEntity.status === 200) {
      return responseFunctions.error(CODE_OK,"Imagen actualizada correntamente", updatedEntity);
    }

    return responseFunctions.error(
      CODE_BAD_REQUEST,
      MESS_ERROR_PUT,
      updatedEntity
    );
  }

  async updatePassword(id, newPassword) {
    if (responseFunctions.emptyId(id))
      return responseFunctions.error(CODE_NOT_FOUND, MESS_EMPTY_ID);

    if (responseFunctions.notFoundEntity(id))
      return responseFunctions.error(CODE_NOT_FOUND, MESS_ID_NOT_FOUND);

    // Encrypto la nueva contraseña
    const hashedPassword = await jwtFunctions.hashedPassword(newPassword);

    const newEntity = {
      password: hashedPassword,
    };

    const updatedEntity = await this.repository.updateUser(id, newEntity);

    if (updatedEntity.status === 200) {
      return responseFunctions.error(CODE_OK, "Contraseña actualizada", updatedEntity);
    }

    return responseFunctions.error(
      CODE_BAD_REQUEST,
      MESS_ERROR_PUT,
      updatedEntity
    );
  }

  async getUserByEmail(body) {
    const entity = await this.userRepository.getUserByEmail(body);
    return entity;
  }
}

module.exports = UserService;
