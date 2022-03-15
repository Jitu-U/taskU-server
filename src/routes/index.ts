import express from "express";
import Tasks from "../models/tasks";

const routes = express.Router();

routes.get('/', (req, res) => {
    res.send('Hello World!');
  });

routes.get('/tasks',(req,res) => {
  res.header("Access-Control-Allow-Origin", "*");
    Tasks.find().then( result =>  res.send(result))
    .catch( err => console.log(`Cannot get tasks ` , err));
});

routes.post('/create',(req,res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.send(req.body);
   console.log(req.body);
})





export default routes;