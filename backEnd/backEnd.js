const express = require('express')
const app = new express();
const cors = require('cors')
const bodyParser = require('body-parser');
const { ConnectDB, getDB } = require('./connectingDB')
const bcrypt = require('bcrypt')
app.use(cors())
app.use(bodyParser.json());
app.use(express.json());


let DB;

ConnectDB((error) => {
  if (!error) {
    app.listen(5000, function () {
      console.log('Server work')
      DB = getDB()
    })
  }
  else {
    console.log(error)
  }
})


app.get('/', function (req, res) {
  res.send("<h1>l</h1>")
})


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
    const usingDB = await collection.insertOne({ username, login, password: hash });

    res.status(200).json(usingDB);
  }
});


app.post('/login', async function (req, res) {
  const { username, login, password } = req.body;

  try {

    const user = await DB.collection('test').findOne({ $or: [{ username }, { login }] });

    const data = {}; // Використовуйте `const`, оскільки об'єкт не переназначається
    const saltRounds = 10;

    // Створюємо сіль та хеш паролю
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);

    if (user) {
      // Порівнюємо збережений хеш паролю користувача з отриманим хешем `hash`
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        data.success = true;
        data.message = 'Successful login';
      } else {
        data.success = false;
        data.message = 'Login failed';
      }
    } else {
      data.success = false;
      data.message = 'User is not found';
    }


    res.status(data.success ? 200 : 409).json(data);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});