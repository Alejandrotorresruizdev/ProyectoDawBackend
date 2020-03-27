const express = require('express');
const app = express();

let _config = null;

class Server {
    constructor({config}){
        _config = config
    }

    start(){
        return new Promise(resolve => {
            app.listen(_config.PORT, () => {
                console.log(
                            '#############################################\n'+
                            _config.APPLICATION_NAME + " API running on port " + _config.PORT+
                            '\n#############################################')
                resolve();
            });
        })
    }
}

module.exports = Server;