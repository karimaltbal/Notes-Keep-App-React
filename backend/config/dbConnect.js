const mongoose = require("mongoose")


const dbCoonect = ()=>{
    const DB = process.env.MONGO_URI

    mongoose.connect(DB,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(()=>{
        console.log("database coonect done")
    }).catch((err)=>{
        console.log(err)
    })
}

module.exports = dbCoonect




