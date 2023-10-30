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
  const { username, login, password } = req.body;

  const collection = await DB.collection('test');
  const user = await collection.findOne({ $or: [{ username }, { login }] });

  let data = {};

  if (user) {
    data.message = 'User exists';
    res.status(409).json(data.message);
  } else {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    const usingDB = await collection.insertOne( { username, login, password: hash });

    res.status(200).json(usingDB);
  }
});





