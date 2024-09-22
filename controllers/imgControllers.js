// const gambar=require('../models/img.js')
// const  postImg=async function(req,res){
//     try{
//         const postGambar= new gambar({
//             namaGambar:req.body.nama,
//             urlGambar:req.body.url
//         })
//         if(postGambar){
//             await postGambar.save()
//             res.status(200).json(postGambar)
//         }
//         else{
//             res.status(404).send('invalid to post gambar')
//         }
       
//     }
//     catch(Err){
//         res.status(404)
//         throw new Error(Err)
//     }
// }

// const getImg =async function(req,res) {
//     try{
//         const getAllGambar = await gambar.find({})
//         if(getAllGambar){
//             res.status(200).json(getAllGambar) 
//         }
//         else{
//             res.status(300).send('invalid to get all gambar')
//         }
        
//     }
//     catch(Err){
//         res.status(404)
//         throw new Error(Err)
//     }
// }

// const getImgById =async function(req,res) {
//     try{
//         const getGambarById = await gambar.findById(req.params.id)
//         if(getGambarById){
//             res.status(200).json(getGambarById) 
//         }
//         else{
//             res.status(300).send('invalid to get all gambar')
//         }
        
//     }
//     catch(Err){
//         res.status(404)
//         throw new Error(Err)
//     }
// }


// const deleteImg=async function(req,res) {
//     try{
//         const {id} =req.params.id
//         const deleteImgId=await gambar.findByIdAndDelete(id)
//         if(deleteImgId){
//             res.status(200).send('sukses to delete img')
//         }
//         else{
//             res.status(300).send('invalid to delete img')
//         }
//     }
//     catch(Err){
//         res.status(404)
//         throw new Error(Err)
//     }
// }
// const updateImg=async function(req,res){
//     try{
//         const{nama,urlImg}=req.body
//         const {id} = req.params
//         const updateDataImg= await gambar.findByIdAndUpdate(id,{namaGambar:nama},{urlGambar:urlImg})
//         if(updateDataImg){
//             res.status(200).send('sukses to update')
//         }
//         else{
//             res.status(300).send('invalid')
//         }
        
//     }
//     catch(Err){
//         res.status(404)
//         throw new Error(Err)
//     }
// }
// module.exports={postImg,getImg,deleteImg,updateImg,getImgById}