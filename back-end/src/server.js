const express = require("express")
const listEndpoints = require("express-list-endpoints")
const usersRouter = require("./services/problematicRoutes/users")
const problemsRoutes = require("./services/problematicRoutes")
const { badRequestErrorHandler, forbiddenErrorHandler, unauthorizedErrorHandler, catchAllErrorHandler, notFoundErrorHandler } = require("./errorHandling")
const cors = require("cors")

const server = express()
server.use(cors())
const port = process.env.PORT || 3001



const loggerMiddleware = (req,res,next) =>{
  console.log(`${req.method} ${req.url} ${new Date()}`)
  
  next()
}



server.use(express.json())
server.use(loggerMiddleware)

server.use("/students", usersRouter)
server.use("/problems", problemsRoutes)

server.use(badRequestErrorHandler)
server.use(forbiddenErrorHandler)
server.use(unauthorizedErrorHandler)
server.use(notFoundErrorHandler)
server.use(catchAllErrorHandler)

console.log(listEndpoints(server))

server.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
