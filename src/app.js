const express = require('express');
const Student = require('./models/Student');


const app = express();

// middleware 
app.use(express.json());

// Routes

// Get all the students
app.get('/students', async (req, res) => {
    const students = await Student.find()
    if (!students) return statusCode(404)
    res.send(students)
})

// Add student to database
app.post('/students', async (req, res) =>{
    const student = new Student({
        name: req.body.name,
        sex: req.body.sex,
        class: req.body.class,
        age: req.body.age,
        grade_point: req.body.grade_point,
       isDeleted:req.body.isDeleted
    })
    const result = await student.save()
    res.send(result)
})

// Get specific student
app.get('/students/:id', async (req, res) =>{
    const student=await Student.findById(req.params.id)
    if (!student || student.isDeleted) return statusCode(404)
    res.send(student)
})

// delete specific student
app.delete('/students/:id', async (req, res) =>{
    if (req.query.type === "soft") {
        const student = await Student.findById(req.params.id)
        if (!student ||student.isDeleted) return statusCode(404)
        student.isDeleted = true
        const result=await student.save()
        res.status(200).send(result)
    }
    if (req.query.type === "hard") {
        const student = await Student.findByIdAndDelete(req.params.id)
        res.status(200).send(student)
    }
}) 


module.exports = app;
