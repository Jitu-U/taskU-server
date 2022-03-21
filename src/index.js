


const dotevnv = require('dotenv')
dotevnv.config();

const express = require('express')
const routes = require('./routes/app-routes')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express();
const port = 8000;



app.use(cors());
app.use(express.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});




const uri = process.env.MONGO_URI

app.use('/api',routes);

//Connecting to Database
mongoose.connect(uri)
    .then(()=>{console.log("database connected")})
    .catch( err => { console.error(err.message)});
app.use('/api',routes)

app.get('/',(req,rese, next)=>{
  console.log('Server listened')
  res.send('Server created');
})

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});


