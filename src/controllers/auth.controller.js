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
}

module.exports = AuthController;
