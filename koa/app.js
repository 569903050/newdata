const koa=require('koa')

let app=new koa()

let static=require('koa-static');

let router=require('koa-router')();

app.use(router.routes())
app.use(router.allowedMethods());

let mysql=require('./mysql/index')

router.get('/ooo',async (etx,next)=>{

    let aa=await mysql()
    // mysql().then(function(data){
    //     console.log(data)
    // })

    etx.body=aa
})

// app.use(async (etx,next)=>{
//     // console.log(etx.request.url)
//     // console.log(etx.request.path)
//     // etx.response.body=11;
//     let time=new Date()*1
//     console.log('一')
//     await next()
//     let newtime= new Date()*1;
//     let cha=newtime-time
//     console.log(cha)
// })
// app.use(async (etx,next)=>{
//     await next()
//     console.log('二')

// })
// app.use(async (etx,next)=>{
//     console.log('san')
// })

app.listen(3000,()=>{
    console.log('启动成功')
})