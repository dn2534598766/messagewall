const{
    createCanvas,
    loadImage
}=require('canvas')

function watermark(pic,wm){
    loadImage(pic).then(myimg=>{
        loadImage(wm).then(wming=>{
            const canvas=createCanvas(myimg.width,myimg.height)
            const ctx=canvas.getContext('2d')
            ctx.drawImage(myimg,0,0)
            ctx.drawImage(wming,0,0)

            const fs=require('fs')
            const out=fs.createWriteStream(__dirname+'/'+pic)
            const stream=canvas.createPNGStream()
            stream.pipe(out)
            out.on('finish',()=>console.log('PNG file created.'))
        })
    })
}

module.exports=watermark
