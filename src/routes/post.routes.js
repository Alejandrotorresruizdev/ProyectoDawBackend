const { Router } = require('express');

module.exports = function({PostController}) {
    const router = Router();

    router.get('/:id', PostController.get);
    router.get('/:id/all', PostController.getPostByIdUser)
    router.post('', PostController.create);
    router.put('/:idEntity',PostController.update)
    router.delete('/:idEntity',PostController.delete)

    return router;
}