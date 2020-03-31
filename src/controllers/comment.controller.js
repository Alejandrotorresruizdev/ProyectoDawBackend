class CommentController {

    constructor(){

    }

    async get (req,res) {
        return res.send("GET -> COMMENT CONTROLLER");
    }
}


module.exports = CommentController;