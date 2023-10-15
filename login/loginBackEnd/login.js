const express = require('express')
 const app = new express();
const cors =require('cors')
const bodyParser = require('body-parser');
const {ConnectDB, getDB} = require('./connectingDB')

app.use(cors())
app.use(bodyParser.json());
app.use(express.json());


let DB;

ConnectDB((error)=>{
   if(!error){
    app.listen(5000, function(){
        console.log('Server work')
        DB = getDB()
    })
   }
   else{
     console.log(error)
   }
})


app.get('/', function(req, res){
     res.send("<h1>l</h1>")
}) 

app.post('/login', async function(req, res){
  const { username, login, password } = req.body;

  try {
    
    const user = await DB.collection('test').findOne({ $or: [{ username }, { login }] });

    let data = {};

    if (user) {
      data.success = user.password === password;
      data.message = data.success ? 'Successful login' : 'Login failed';
    } else {
      data.success = false;
      data.message = 'Uer is not found';
    }

    res.status(data.success ? 200 : 409).json(data);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});


