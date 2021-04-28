const{
    createCanvas,
    loadImage
}=require('canvas')

const ratio=0.1

function watermark(pic,wm){
    loadImage(pic).then(myimg=>{
        loadImage(wm).then(wmimg=>{
            const canvas=createCanvas(myimg.width,myimg.height)
            const ctx=canvas.getContext('2d')
            ctx.drawImage(myimg,0,0)

            const long=Math.sqrt(wmimg.width*wmimg.width+wmimg.height*wmimg.height)
            const halflong=long/2

            const bglong=Math.max(myimg.width,myimg.height)

            const signscale=bglong/long*ratio

            const vmlong=long*signscale

            const canvas1=createCanvas(vmlong,vmlong)

            const ctx1=canvas1.getContext('2d')

            ctx1.scale(signscale,signscale)

            ctx1.translate(halflong,halflong)

            ctx.rotate((Math.random()-0.5)*Math.PI/2)

            ctx1.translate(-halflong,-halflong)

            ctx1.drawImage(wmimg,(long-wmimg.width)/2,(long-wmimg.height)/2)
            
            const posx=(myimg.width-vmlong)*Math.random()
            const posy=(myimg.height-vmlong)*Math.random()
            ctx.drawImage(canvas1,posx,posy)


            const fs=require('fs')
            const out=fs.createWriteStream(__dirname+'/'+pic)
            const stream=canvas.createPNGStream()
            stream.pipe(out)
            out.on('finish',()=>console.log('PNG file created.'))
        })
    })
}

module.exports=watermark
watermark('bg.png','watermark.png')
