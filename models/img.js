const mongoose = require('mongoose')

mongoose.connect(process.env.mongodb_url)
.then((res)=>{
    console.log(res)
})
.catch((err)=>{
    console.log(err)
})

const schema =new mongoose.Schema({
    nama:{
        type:String,
        required:true
    },
    urlPath:{
        type:String,
        required:true
    }
})

const img=mongoose.model('img',schema)
module.exports=img