import { Request, Response, NextFunction } from 'express';



const dotevnv = require('dotenv')
dotevnv.config();

const express = require('express')
const routes = require('./routes/index')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express();
const port = 8000;


app.use('/api',routes);
app.use(cors());
app.use(express.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


const uri = process.env.MONGO_URI


//Connecting to Database
mongoose.connect(uri)
    .then(()=>{console.log("database connected")})
    .catch( err => { console.error(err.message)});
app.use('/api',routes)

app.get('/',(req : Request,res : Response, next: NextFunction)=>{
  console.log('Server listened')
  res.send('Server created');
})

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
function err(err: any) {
  throw new Error('Function not implemented.');
}

