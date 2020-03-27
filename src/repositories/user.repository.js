
const BaseRepository = require('./base.repository');

class User extends BaseRepository {

    constructor({User}){
        super(User);
    }
}


module.exports = User;