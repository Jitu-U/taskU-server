import express from "express";
import Tasks from "../models/tasks";

const routes = express.Router();

routes.get('/', (req, res) => {
    res.send('Hello World!');
  });

//For initial getting all tasks
routes.get('/tasks',(req,res) => {
  res.header("Access-Control-Allow-Origin", "*");
    Tasks.find().then( result =>  res.send(result))
    .catch( err => console.log(`Cannot get tasks ` , err));
});


// For creating new Task
routes.post('/create',(req,res) => {
  res.header("Access-Control-Allow-Origin", "*");
   console.log(req.body);
   const t = new Tasks();
   t.id = req.body.id;
   t.description = req.body.description;
   t.deadline = req.body.deadline;
   t.isComplete = req.body.isComplete;
   //Pushing to Database
    t.save()
    .then( data => res.send(data))
    .catch( err => console.log('ERROR',err));
})

//Delete a Task
routes.post('/delete',(req,res) => {
  res.header("Access-Control-Allow-Origin", "*");
})

//Modify a Task
routes.post('/modify'),(req,res) => {
  res.header("Access-Control-Allow-Origin", "*");
}





export default routes;