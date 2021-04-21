const express=require('express')
const multer=require('multer')
const watermark=require('./watermark.js')

const updir='./uploads'
let app=express()
app.use(express.static(updir))
app.use(express.static('.'))

let storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,updir)
    },
    filename:function(req,file,cb){
        fileformat=file.originalname.split('.').slice(-1)[0]
        cb(null,file.fieldname+'-'+Date.now()+'.'+fileformat)
    }
})

let upload=multer({
    storage
})

app.get('/',function(req,res,next){
    res.send('hi')
})

app.post('/watermark',upload.single('file'),function(req,res,next){
    let file=req.file
    watermark('bg.png',updir+'/'+file.filename)
    res.send('bg.png')
})

app.listen(80)