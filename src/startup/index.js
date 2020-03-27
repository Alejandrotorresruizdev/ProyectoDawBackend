const express = require('express');
const app = express();

let _config = null;
let _express = null;

class Server {
    constructor({config,router}){
        _config = config
        _express = express().use(router);
    }

    start(){
        return new Promise(resolve => {
            _express.listen(_config.PORT, () => {
                console.log(
                            '#############################################\n'+
                            _config.APPLICATION_NAME + " API running on port " + _config.PORT+
                            '\n#############################################');
                resolve();
            });
        })
    }
}

module.exports = Server;