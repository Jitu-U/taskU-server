const Tasks = require('../models/tasks')


function getTasks(req, res, next) {

  Tasks.find().then(result => res.send(result))
    .catch(err => {
      res.status(404).send({ error: 'Unable get tasks' });
      console.log(`Cannot get tasks `, err);
    });
}


// Function for adding task to Database 
async function addTask(req, res, next) {
  if (req.body !== undefined) {
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
  } else {
    res.error('Cannot create value')
    console.log("undefined value");
  }
}


async function completeTask(req, res, next) {
  const query = { id: parseInt(req.params.id) };
  
  await  Tasks
      .findOneAndUpdate(query, { $set: { isComplete: true } }, { new: true })
      .then((err, doc) => {
        if (err) {
          console.log(err);
        }
        res.send({msg: 'Completed the Task'});
        console.log(doc);
      })
      .catch(err => {
        console.log('ERROR', err);
        res.send({ error : err});
      });
}

  
async function modifyTask(req, res, next) {
  const query = { id: req.params.id };

    await Tasks.findOneAndUpdate(query,
      {
        $set: {
          description: req.body.description,
          deadline: req.body.deadline
        }
      },
      { new: true }
    ).then((err, doc) => {
      if (err) {
        console.log(err);
      }
      res.send({msg: 'Edited the Task'});
      console.log(doc);
    })
  .catch( err  => {
    res.status(404).send({ error: 'Unable to modify' });
    console.log(err);
  });
}


  async function deleteTask(req, res, next) {
  const query = { id: parseInt(req.params.id) };
  try {
    Tasks
      .findOneAndDelete(query, (err) => {
        console.log('hey');
        if (err) {
          console.log(err);
        }
      });
  } catch (err) {
    res.status(404).send({ error: 'Unable to Complete' });
  }
}


  
  exports.getTasks = getTasks;
  exports.addTask = addTask;
  exports.completeTask = completeTask;
  exports.modifyTask = modifyTask;
  exports.deleteTask =deleteTask;