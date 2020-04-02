const { Router } = require('express');

module.exports = function({CommentController}) {
    const router = Router();

    router.get('/:id', CommentController.getAllCommentsFromPost);
    router.post('', CommentController.create);

    return router;
}