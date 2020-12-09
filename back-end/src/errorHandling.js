const badRequestErrorHandler = (err, req, res, next) =>{
    if(err.httpStatusCode === 400){
        res.status(400).send(err.message)
    }next(err)
}
const forbiddenErrorHandler = (err, req, res, next) =>{
    if(err.httpStatusCode === 403){
        res.status(403).send('error Frobbiden')
    }next(err)
}
const unauthorizedErrorHandler = (err, req, res, next) =>{
    if(err.httpStatusCode === 401){
        res.status(401).send('error not authorized')
    }next(err)
}
const notFoundErrorHandler = (err, req, res, next) =>{
    if(err.httpStatusCode === 404){ 
        res.status(404).send('Error not found')
    }next(err)
}
const catchAllErrorHandler = (err, req, res, next) =>{
    if(!res.headersSent){
        console.log(err)
        res.status(err.httpStatusCode || 500).send('generic server error')
    }
}
module.exports = {
    notFoundErrorHandler,
    unauthorizedErrorHandler,
    forbiddenErrorHandler,
    badRequestErrorHandler,
    catchAllErrorHandler,
}