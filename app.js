const express = require('express')
const app = express()
const path = require('path')
const morgan = require('morgan')
const bodyParser=require('body-parser')
const cors = require('cors')
const multer = require('multer')
require('dotenv').config()
const methodOverride=require('method-override')

app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(methodOverride('_method'))

app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))
app.use('/upload',express.static(path.join(__dirname,'upload')))
const img = require('./models/img')

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,'upload'))
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
})
const upload=multer({
    storage:storage,
    limits: { fileSize: 10 * 1024 * 1024 }
})
// endpoint post new img
app.post('/upload',upload.single('avatar'),async(req,res)=>{
    try{
        const newImg = new img({
            nama:req.file.originalname,
            urlPath:req.file.path
        })
         await newImg.save()
    }
    catch(err){
        res.status(404)
        throw new Error(err)
    }
})

// endpoint to get page upload
app.get('/upload',(req,res)=>{
    try{
        res.status(200).render('upload')
    }
    catch(Err){
        res.status(404)
    throw new Error(Err)
    }
})

// endpoint page get all img 
app.get('/img',async(req,res)=>{
    try{
        const getImg = await img.find({})
        res.status(200).render('img',{getImg})
    }
    catch(err){
        res.status(404)
        throw new Error(err)
    }
})

// endpoint page to get view spesifik img 
app.get('/viewsImg/:id',async(req,res)=>{
    try{
        const findImg=await img.findById(req.params.id)
        if(findImg){
            res.status(200).render('viewsImg',{findImg})
        }
        else{
            res.status(301).send('failed to get img')
        }
    }
    catch(err){
        res.status(404)
        throw new Error(err)
    }
})

app.delete('/delete/:id',async(req,res)=>{
    try{
        const {id} = req.params
        const deleteImg= await img.findByIdAndDelete(id)
        if(deleteImg){
            res.status(200).redirect('/img')
        }
        else{
            res.status(402).send('invalid to delete img')
        }
    }
    catch(Err){
        res.status(404)
        throw new Error(Err)
    }
})

app.get('/update/:id',async(req,res)=>{
    try{
        const {id} = req.params 
        if(id){
            res.status(200).render('update',{id})
        }
        else{
            res.status(402).send('invalid to update img')
        }    
    }
    catch(Err){
        res.status(404)
        throw new Error(Err)      
    }
})
app.put('/update/:id',upload.single('name'),async(req,res)=>{
    try{
        const {id} = req.params  
        if(id){
            const updateImg = await img.findByIdAndUpdate(id,{nama:req.file.filename})
                if(updateImg){
                    res.status(200).redirect('/img')
                }
                else{
                    res.status(401).send('failed to update img')
                }
        }
        else{
            res.status(402).send('invalid get id')
        }
        res.status(200)
    }
    catch(Err){
        res.status(404)
        throw new Error(Err)
    }
})
app.listen(8080,()=>{
    console.log('http://localhost:8080')
})