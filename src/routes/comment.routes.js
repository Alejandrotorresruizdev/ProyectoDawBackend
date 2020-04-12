const { Router } = require('express');

module.exports = function({CommentController}) {
    const router = Router();

    router.get('/:id/all', CommentController.getAllCommentsFromPost);
    router.post('', CommentController.create);

    return router;
}