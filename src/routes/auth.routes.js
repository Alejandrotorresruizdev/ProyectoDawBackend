const { Router } = require('express');

module.exports = function({AuthController}) {
    const router = Router();

    router.post('/signIn', AuthController.signIn);
    router.post('/signUp', AuthController.signUp)
    router.post('/recovery-password/:email', AuthController.recoveryPassword)

    return router;
}