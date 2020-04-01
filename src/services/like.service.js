const BaseService = require("./base.service");

class LikeService extends BaseService  {
  constructor({LikeRepository}) {
    super(LikeRepository);
  }
  

}

module.exports = LikeService;