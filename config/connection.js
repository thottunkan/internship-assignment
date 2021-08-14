const mongodb = require('mongodb').MongoClient
const url =  "mongodb+srv://root:mongodb@cluster0.4sip9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const state = {
    database:null
}



module.exports.makeConnection = ()=>{
    mongodb.connect(url,(err,db)=>{

        if (err) {
            console.log("connection failed");
        }
        else{
            console.log("connected to atlas")
            state.database = db.db("internship")
        }
    })
}
module.exports.getDatabase = ()=>{
    return state.database;
}