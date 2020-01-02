let Koa =require('koa');

let static=require('koa-static');

let app=new Koa();

let router=require('koa-router')()

let mysql=require('../mysql/index')

app.use(router.routes())

router.get('/list',async (etx,next)=>{
    let a=await mysql()
    etx.body=a
})

app.listen(3002,()=>{
    console.log('启动成功')
})