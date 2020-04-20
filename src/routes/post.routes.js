const { Router } = require('express');

const {
    checkTokenMidleware
  } = require("../middlewares");

module.exports = function({PostController}) {
    const router = Router();

    router.get('/:id',[checkTokenMidleware], PostController.get);
    router.get('/:id/all',[checkTokenMidleware], PostController.getPostByIdUser)
    router.get('/',PostController.getPostByDate);
    router.post('',[checkTokenMidleware], PostController.create);
    router.put('/:idEntity',[checkTokenMidleware],PostController.update)
    router.delete('/:idEntity',[checkTokenMidleware],PostController.delete)

    return router;
}