const { Router } = require('express');
const {
    checkTokenMidleware
  } = require("../middlewares");

module.exports = function({CommentController}) {
    const router = Router();

    router.get('/:id/all', CommentController.getAllCommentsFromPost);
    router.post('', [checkTokenMidleware],CommentController.create);

    return router;
}