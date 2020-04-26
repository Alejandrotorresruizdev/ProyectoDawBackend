const { Router } = require('express');

module.exports = function({UserController}) {
    const router = Router();

    router.get('/', UserController.get);
    router.put('/', UserController.update);
    router.put('/password', UserController.updatePassword);
    router.put('/avatar', UserController.updateAvatar)
    router.post('', UserController.create);

    return router;
}