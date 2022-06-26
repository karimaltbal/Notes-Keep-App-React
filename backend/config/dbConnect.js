const mongoose = require("mongoose")

const dbCoonect = ()=>{

    mongoose.connect("mongodb+srv://don:nk6T3UWKCc1lU6MH@cluster0.imcic.mongodb.net/Notes-Keeping",{
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(()=>{
        console.log("database coonect done")
    }).catch((err)=>{
        console.log(err)
    })
}

module.exports = dbCoonect




