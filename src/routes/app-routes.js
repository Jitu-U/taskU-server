const express = require('express')
const controller  = require('../controllers/taskController')

const routes = express.Router();

routes.get('/', (req, res,next) => {
  res.send('Welcome to TaskU server');
});

//For initial getting all tasks
routes.get('/tasks', controller.getTasks);


// For creating new Taskrs
routes.post('/create', controller.addTask)

//Complete a Task
routes.post('/complete/:id', controller.completeTask)

//Modify a Task
routes.post('/modify/:id',controller.modifyTask)

//Delete a Task
routes.post('/delete/:id',controller.deleteTask )


module.exports = routes;