const container = require('./src/startup/container');

const server = container.resolve('server');
const sequelize = require('./src/utils/dbSetup.utils');


sequelize.authenticate().then(()=>{
    // server.start();
}).catch(err => {
    console.log(err);
})
