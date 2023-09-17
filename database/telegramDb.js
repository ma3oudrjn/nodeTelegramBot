const db = require('mongoose')
db.connect("xxxx")
.then(()=>{
console.log("you are connect")
}).catch((err)=>{
console.log("eror to connect to the data base",err)
})

const userShema = new db.Schema({
studentName: String,
studentPhone: String,
userId: String
})

const userInfo=db.model('userDb',userShema)
module.exports = userInfo
