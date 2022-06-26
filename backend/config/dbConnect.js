const mongoose = require("mongoose")

const dbCoonect = ()=>{

    mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(()=>{
        console.log("database coonect done")
    }).catch((err)=>{
        console.log(err)
    })
}

module.exports = dbCoonect




