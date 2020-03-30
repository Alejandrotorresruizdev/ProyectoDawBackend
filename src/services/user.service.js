const BaseService =  require('./base.service');

let _userRepository = null;

class UserService extends BaseService {

    constructor({ UserRepository }) {
        super(UserRepository)
        _userRepository = UserRepository;
    }

    async getUserByEmail (body) {
        const entity = await _userRepository.getUserByEmail(body);
        return entity;
    }
}

module.exports = UserService;