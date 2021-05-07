const express=require('express')
const multer=require('multer')
const watermark=require('./watermark.js')
const bodyParser=require('body-parser')
const Mock=require('mockjs')


const updir='./uploads'
let app=express()
app.use(express.static(updir))
app.use(express.static('.'))
app.use(bodyParser.urlencoded({
    extended:false
}))
app.use(bodyParser.json())

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

let data={
    sno:'07190999',
    name:'',
    gender:1,
    skills:[
        {
            name:'HTML',
            count:0
        },
        {
            name:'CSS',
            count:0
        },
        {
            name:'javascript',
            count:0
        },
        {
            name:'Vuejs',
            count:0
        },
        {
            name:'miniprogram',
            count:0
        }
    ],
    satisfaction:0,
    opinion:'',
    count:0
}

app.get('/sampledata',(req,res)=>{
    res.json(data)
})
app.post('/sampledata',(req,res)=>{
    console.log(req.body)
    data.skills.forEach(v=>{
        req.body.skills.indexOf(v.name)>-1?v.count++:""
    })
    data.satisfaction=(data.satisfaction*data.count+req.body.satisfaction)/(data.count+1)
    data.count++
    data.name=Mock.mock('@cname')
    data.opinion=Mock.mock('@cparagraph')
    res.json(data)
})
app.listen(8080)