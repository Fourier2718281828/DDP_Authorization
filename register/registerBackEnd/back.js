const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('mongodb')
const cors = require('cors');
const { ConnectDB, getDB } = require('./connectDB')

const app = express();
const port = 5000;

let DB;

ConnectDB((error) => {
  if (!error) {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
    DB = getDB()
  }
  else {
    console.log(error)
  }
})


app.use(bodyParser.json());
app.use(cors());
app.use(express.json());




app.post('/register', async function (req, res) {
  const { username, login, password, password_confirmation} = req.body

 if(!username || !login || !password || !password_confirmation){
 res.status(500).json('Error')
 }

  const collection = await DB.collection('test')
   const user = await collection.findOne({ $or: [{ username }, { login }] });
 
  let data = {
      message: 'User exits', 
      JSONbody: req.body,
   }

   user? data.message: await collection.insertOne(data.JSONbody)
  const statusCode = user? 409: 200
  const bodyJSON = user? data.message: data.JSONbody

  res.status(statusCode).json(bodyJSON)
})



