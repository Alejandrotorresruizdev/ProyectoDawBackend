let _userService = null;
let _userRepository = null;
const responseFunctions = require("../utils/responseHttp.utils");
const jwtFunctions = require("../utils/jwt");
const mailerFunctions = require("../utils/mailer.utils");

const {
  CODE_OK,
  CODE_NOT_FOUND,
  CODE_CREATED,
  CODE_BAD_REQUEST,
} = require("../constants/httpCodes");

const {
  MESS_OK_POST,
  MESS_ERROR_POST,
  MESS_ID_NOT_FOUND,
} = require("../constants/errorMessages");
const { compareSync } = require("bcryptjs");

class AuthService {
  constructor({ UserService, UserRepository }) {
    _userService = UserService;
    _userRepository = UserRepository;
  }

  async signIn(body) {
    const loggedUser = await _userService.getUserByEmail(body.email);

    if (!loggedUser.length) {
      return responseFunctions.error(
        CODE_NOT_FOUND,
        "El email es incorrecta",
        loggedUser
      );
    }

    const checkPassword = compareSync(body.password, loggedUser[0].password);

    if (checkPassword) {
      const generatedToken = await jwtFunctions.generateToken(loggedUser[0]);

      return responseFunctions.error(
        CODE_OK,
        "La credenciales son correctas",
        loggedUser,
        generatedToken
      );
    }

    return responseFunctions.error(
      CODE_NOT_FOUND,
      "La contraseña es incorrecta"
    );
  }

   async signUp(entity, file) {
    
    if(file){
      try {
        const dateName = Date.now();
        file.mv(`./uploads/${dateName}.jpg`);
        entity.imagen = `/uploads/${dateName}.jpg`;
      } catch (error) {
        console.log(error)
      }
    }

    const entityCreated = await _userService.create(entity);

    // Si hay un error enviamos un mensaje de error.
    if (entityCreated.status === CODE_BAD_REQUEST) {
      let errorMsg;
      if (entityCreated.message == "usuario_UNIQUE")
        errorMsg = "El nombre de usuario ya esta en uso";
      if (entityCreated.message == "email_UNIQUE")
        errorMsg = "El nombre del email ya esta en uso";

      return await responseFunctions.error(
        CODE_BAD_REQUEST,
        MESS_ERROR_POST,
        errorMsg
      );
    }
    // Si se ha creado correctamente generamos un token y devolvemos la respuesta
    const generatedToken = await jwtFunctions.generateToken(entityCreated.data);

    return await responseFunctions.error(
      CODE_CREATED,
      MESS_OK_POST,
      entityCreated.data,
      generatedToken
    );
  }

  async recoveryPassword(email) {
    if (responseFunctions.emptyId(email))
      return responseFunctions.error(CODE_NOT_FOUND, MESS_EMPTY_ID);

    const currentEntity = await _userService.getUserByEmail(email);

    if (responseFunctions.notFoundEntity(currentEntity.length))
      return responseFunctions.error(CODE_NOT_FOUND, MESS_ID_NOT_FOUND);

    // Genero una nueva password
    const randomPassword = await jwtFunctions.generateRandomPassword();

    // Encrypto la nueva contraseña
    const hashedPassword = await jwtFunctions.hashedPassword(randomPassword);

    // Actualizo la contraseña del objeto entity por la nuva contraseña generada
    currentEntity[0].password = await hashedPassword;

    // Actualizo la password en la base de datos
    const recoveryPasswordUpdated = await _userRepository.update(
      currentEntity[0].id,
      { password: currentEntity[0].password }
    );

    if (!recoveryPasswordUpdated)
      return responseFunctions.error(
        CODE_BAD_REQUEST,
        "Ha ocurrido un error en la actualización de la contraseña"
      );

    // Envío un correo al usuario con una nueva password
    const recoveryPasswordMail = await mailerFunctions.send(
      randomPassword,
      currentEntity[0].email
    );

    if (recoveryPasswordMail) {
      return responseFunctions.error(
        CODE_OK,
        "Contraseña restablecida correctamente"
      );
    } else {
      return responseFunctions.error(
        CODE_BAD_REQUEST,
        "Ha ocurrido un error en la actualización de la contraseña"
      );
    }
  }
}

module.exports = AuthService;
