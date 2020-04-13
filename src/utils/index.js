if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

module.exports = {
    PORT: process.env.PORT,
    APPLICATION_NAME: process.env.APPLICATION_NAME,
    JWT_SECRET: process.env.JWT_SECRET,
    MYSQL_URI :process.env.MONGO_URI,
    MYSQL_DB : process.env.MYSQL_DB,
    MYSQL_USER : process.env.MYSQL_USER,
    MYSQL_PASS :process.env.MYSQL_PASS,
    DB_TYPE: process.env.DB_TYPE,
    SWAGGER_PATH:`../config/swagger/${process.env.SWAGGER_DOC}.json`
}