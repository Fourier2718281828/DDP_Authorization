const {MongoClient} = require('mongodb')

url = 'mongodb://localhost:27017/testDB'


let g;

module.exports={
   ConnectDB:((callback)=>{
    MongoClient
      .connect(url)
      .then((client)=>{
        g = client.db()
        console.log('Connection DB')
        callback(null)
      })
      .catch((error)=>[
         callback(error)
      ])
   }),
   getDB:(function(){
      return g;
   })
}