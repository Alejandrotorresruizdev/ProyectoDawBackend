const { Router } = require('express');

module.exports = function({LikeController}) {
    const router = Router();

    router.post('', LikeController.create);
    router.get('/:id/all',LikeController.getAllLikesFromPost)

    return router;
}