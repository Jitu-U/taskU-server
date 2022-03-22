const express = require('express')
const controller = require('../controllers/taskController')

const router = express.Router();

router.get('/', (req, res, next) => {
  res.send({'API endpoints' : ['1.GET: /tasks : to get all tasks ','2.POST: /create : to create task ','3.POST: /complete/:id : to change status of Task to complete','4.POST: /modify/:id : to Modify the task', '5.POST: /delete/:id : to delete the task']});
});

//For initial getting all tasks
router.get('/tasks', controller.getTasks);


// For creating new Taskrs
router.post('/create', controller.addTask)

//Complete a Task
router.post('/complete/:id', controller.completeTask)

//Modify a Task
router.post('/modify/:id', controller.modifyTask)

//Delete a Task
router.post('/delete/:id', controller.deleteTask)


module.exports = router;