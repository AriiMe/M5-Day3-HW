const express = require("express")

const router = express.Router()


router.get("/huston", (req, res) =>{
    throw new Error("got a proble?")
})

router.get("/nonExistant", (req, res, next) =>{
    const err = new Error( "not found error")
    err.httpStatusCode = 404
    next(err)
})
router.get("/unauthorized", (req, res, next) =>{
    const err = new Error ("unaothrized")
    err.httpStatusCode = 401
    next(err)
})

router.get("/forbidden", (req, res, next) =>{
    const err = new Error ("forbidden")
    err.httpStatusCode = 403
    next(err)
})
router.get("/badrequest", (req, res, next) =>{
    const err = new Error ("bad Request")
    err.httpStatusCode = 400
    next(err)
})




module.exports = router