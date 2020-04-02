module.exports = {
    checkTokenMidleware : require('./checkToken.middleware'),
    NotFoundMiddleware : require('./not-found.middleware'),
    CheckIdUserMidleware : require('./checkIdUser.middleware'),
    ErrorMiddleware : require('./error.middleware')
}