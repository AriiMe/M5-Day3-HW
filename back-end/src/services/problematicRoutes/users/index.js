const express = require("express")
const fs = require("fs")
const path = require("path")
const uniqid = require("uniqid")
const {check, validationResult} = require("express-validator")


const router = express.Router()

const readFile = (fileName) => {
  const buffer = fs.readFileSync(path.join(__dirname, fileName))
  const fileContent = buffer.toString()
  return JSON.parse(fileContent)
}

router.get("/:id", (req, res, next) => {
  try{
    const studentsDB = readFile("students.json")
    const student = studentsDB.filter(student => student.ID === req.params.id)
    if(student.length > 0){
      res.send(student)
    }else{
      const err = new Error()
      err.httpStatusCode = 404
       next(error)
    }
    
    
  }catch(error){
   console.log(error)
  }
})

router.get("/", (req, res, next) => {

  try{
const studentsDB = readFile("students.json")
  if (req.query && req.query.name) {
    const filteredStudents = studentsDB.filter(
      student =>
        student.hasOwnProperty("name") &&
        student.name.toLowerCase() === req.query.name.toLowerCase()
    )
    res.send(filteredStudents)
  } else {
    res.send(studentsDB)
  }
  }catch(error){
    next(error)
  }
  
})

router.post("/", [check("name").exists().withMessage("name is a mandatory field"),
check("description").exists().withMessage("Needs a description"),
check("repoUrl").exists().isURL().withMessage("has to be a valid repoUrl"),
check("liveUrl").exists().isURL().withMessage("has to be a valid Live URL"), ], (req, res, next) => {
  try{

    const errors = validationResult(req)

    if (!errors.isEmpty()){
      const err = new Error()
      err.httpStatusCode = 400
      err.message = errors
      next(err)
    }else {

    const studentsDB = readFile("students.json")
    const newStudent = {
      ...req.body,
      ID: uniqid(),
      modifiedAt: new Date(),
    }
  
    studentsDB.push(newStudent)
  
    fs.writeFileSync(path.join(__dirname, "students.json"), JSON.stringify(studentsDB))
  
    res.status(201).send({ id: newStudent.ID })
}
  }catch(error){
    next(error)
  }
})

router.delete("/:id", (req, res) => {

  const studentsDB = readFile("students.json")
  const newDb = studentsDB.filter(student => student.ID !== req.params.id)
  fs.writeFileSync(path.join(__dirname, "students.json"), JSON.stringify(newDb))

  res.status(204).send()
})

router.put("/:id", (req, res) => {
  const studentsDB = readFile("students.json")
  const newDb = studentsDB.filter(student => student.ID !== req.params.id)

  const modifiedStudent = {
    ...req.body,
    ID: req.params.id,
    modifiedAt: new Date(),
  }

  newDb.push(modifiedStudent)
  fs.writeFileSync(path.join(__dirname, "students.json"), JSON.stringify(newDb))

  res.send({ id: modifiedStudent.ID })
})

module.exports = router
