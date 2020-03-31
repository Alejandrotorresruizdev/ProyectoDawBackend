class PostController {
  constructor() {}

  async get(req, res) {
    res.send("GET POSTS");
  }

  async getAll(req, res) {}

  async create(req, res) {
    res.send("CREATE POST");
  }

  async update(req, res) {}
}

module.exports = PostController;
