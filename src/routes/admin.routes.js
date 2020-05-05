const { Router } = require('express');

const {
    checkRol
  } = require("../middlewares");

module.exports = function({AdminController}) {
    const router = Router();

    router.put('/:id/updateUser', AdminController.updateUser);

    return router;
}