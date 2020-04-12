const { Router } = require('express');

module.exports = function({UserController}) {
    const router = Router();

    router.get('/', UserController.get);
    router.put('/:idusuario', UserController.update);
    router.post('', UserController.create);

    return router;
}