const { Router } = require('express');

module.exports = function({PostController}) {
    const router = Router();

    router.get('/', PostController.create);
    // router.post('/signUp', AuthController.signUp)
    // router.post('/recovery-password/:email', AuthController.recoveryPassword)

    return router;
}