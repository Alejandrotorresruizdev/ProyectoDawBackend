const { Router } = require('express');

module.exports = function({LikeController}) {
    const router = Router();

    router.get('/:id/all',LikeController.update)
    router.post('', LikeController.create);

    return router;
}