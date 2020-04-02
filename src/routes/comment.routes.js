const { Router } = require('express');

module.exports = function({CommentController}) {
    const router = Router();

    router.get('/', CommentController.get);
    router.post('', CommentController.create);
    // router.post('/signUp', AuthController.signUp)
    // router.post('/recovery-password/:email', AuthController.recoveryPassword)

    return router;
}