const db = require('mongoose')
db.connect("mongodb+srv://masoudrng2:138162@shop-cluster.i4llhon.mongodb.net/")
.then(()=>{
console.log("you are connect")
}).catch((err)=>{
console.log("eror to connect to the data base",err)
})
