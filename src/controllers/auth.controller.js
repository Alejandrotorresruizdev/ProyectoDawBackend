let _authService = null;

class AuthController {
  constructor({AuthService}) {
    _authService = AuthService;
  }

  async signIn(req,res){
    const {body} = req;
    const createdUser = await _authService.signIn(body);
    return res.status(createdUser.status).send(createdUser);
  }

  async signUp(req,res){
    const {body} = req;
    const loggedUser = await _authService.signUp(body);
    return res.status(loggedUser.status).send(loggedUser);
  }
}

module.exports = AuthController;
