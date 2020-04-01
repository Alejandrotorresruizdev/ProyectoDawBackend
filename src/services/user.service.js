const BaseService =  require('./base.service');

let userRepository = null;

class UserService extends BaseService {

    constructor({ UserRepository }) {
        super(UserRepository)
        console.log({UserRepository})
        this.userRepository = UserRepository;
    }

    async getUserByEmail (body) {
        const entity = await this.userRepository.getUserByEmail(body);
        return entity;
    }
}

module.exports = UserService;