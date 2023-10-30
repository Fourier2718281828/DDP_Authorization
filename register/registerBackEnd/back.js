const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('mongodb')
const cors = require('cors');
const { ConnectDB, getDB } = require('./connectDB')
const bcrypt = require('bcrypt');

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
  const { username, login, password } = req.body


  const collection = await DB.collection('test')
  const user = await collection.findOne({ $or: [{ username }, { login }] });


  let data = {}

  if(user){
    data.message = 'User exits'
    res.status(409).json(data.message)
  }
  else{
    data.saltRound = 10;
    data.salt = await bcrypt.genSalt(data.saltRounds);
    data.hash = await bcrypt.hash(password, data.salt);
    data.usingDB = await collection.insertOne(data.JSONbody = {username, login, password: data.hash})

      res.status(200).json(data.usingDB)
  
    }
  
})




