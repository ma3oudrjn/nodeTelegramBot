const db = require('mongoose')
db.connect("mongodb://localhost:27017/")
.then(()=>{
console.log("you are connect")
}).catch((err)=>{
console.log("eror to connect to the data base",err)
})

const userShema = new db.Schema({
studentName: String,
studentPhone: String,
userId: String,
isCall:{type: Boolean, default: false},
Registered:{type: Boolean, default:false},
from: String
})

const userInfo=db.model('userDb',userShema)
module.exports = userInfo
