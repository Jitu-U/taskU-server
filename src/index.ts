import express from 'express';
import routes from './routes';
import mongoose from 'mongoose';
import dotevnv from 'dotenv'
dotevnv.config();


const app = express();
const port = 8000;


app.use('/api',routes);


const uri = process.env.MONGO_URI


//Connecting to Database
mongoose.connect(uri)
    .then((result)=>{console.log("database connected")})
    .catch( err => { console.error(err.message)});
app.use('/api',routes)

app.get('/',(req,res)=>{
  console.log('Server listened')
  res.send('Server created');
})

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
function err(err: any) {
  throw new Error('Function not implemented.');
}

