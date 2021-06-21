const express = require('express');
const Student = require('./models/Student');


const app = express();

// middleware 
app.use(express.json());

// Routes

// Get all the students
app.get('/students', async (req, res) => {
    // write your codes here
    const students = await Student.find()
    if (!students) return statusCode(404)
    res.send(students)
})

// Add student to database
app.post('/students', async (req, res) =>{
    // write your codes here
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
    // write your codes here
     const student=await Student.findById(req.params.id)
    if (!student) return statusCode(404)
    res.send(student)
})

// delete specific student
app.delete('/students/:id', async (req, res) =>{
    // write your codes here
}) 


module.exports = app;
