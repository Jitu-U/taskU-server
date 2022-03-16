import express from "express";
import Tasks from "../models/tasks";

const routes = express.Router();

routes.get('/', (req, res) => {
  res.send('Hello World!');
});

//For initial getting all tasks
routes.get('/tasks', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  Tasks.find().then(result => res.send(result))
    .catch(err => {
      res.status(404).send({ error: 'Unable get tasks' });
      console.log(`Cannot get tasks `, err)
    });
});


// For creating new Taskrs
routes.post('/create', async (req, res) => {

  if(req.body !== undefined){
  res.header("Access-Control-Allow-Origin", "*");
  console.log(req.body);
  const t = new Tasks();
  t.id = parseInt(req.body.id);
  t.description = req.body.description;
  t.deadline = req.body.deadline;
  t.isComplete = false;
  //Pushing to Database
  await t.save()
    .then(data => res.send({ data: data }))
    .catch(err => console.log('ERROR', err));
  }else{
    console.log("undefined value getting")
  }
})

//Complete a Task
routes.post('/complete/:id', async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const query = { id: parseInt(req.params.id) };
  try {
    Tasks
      .findOneAndUpdate(query, { $set: { isComplete: true } },{new: true}, (err, doc) => {
        if(err){
          console.log(err);
        }
        res.send('Completed the Task')
        console.log(doc)
      })
  } catch (err) {
    res.status(404).send({ error: 'Unable to Complete' });
  }
})

//Modify a Task
routes.post('/modify/:id'), async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const query = { id: req.params.id };

  try {
    await Tasks.findOneAndUpdate(query,
      {
        $set: {
          description: req.body.description,
          deadline: req.body.deadline
        }
      }
    ).then(res.send('Successfully Edited'));
  } catch (err) {
    res.status(404).send({ error: 'Unable to modify' });
  }
}

//Delete a Task
routes.post('/delete/:id'), async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const query = { id: parseInt(req.params.id) };
  try {
    Tasks
      .findOneAndDelete(query, (err) => {
        console.log('hey')
        if(err){
          console.log(err);
        }
      })
  } catch (err) {
    res.status(404).send({ error: 'Unable to Complete' });
  }
}






export default routes;