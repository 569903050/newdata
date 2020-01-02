let Koa =require('koa');

let static=require('koa-static');

let app=new Koa();

const bodyparser=require('koa-bodyparser');//处理前端post传过来的参数 ctx.request.body

let router=require('koa-router')()

let mysql=require('../mysql/index')

app.use(bodyparser())

app.use(router.routes())

/*
获取参数
 get 

 post 

 delete--------->ctx.query
 
 put
 */

//查   分页
router.get('/api/list',async (etx,next)=>{
    let {pagenum=1,limit=2,sex}=etx.query
    let pageindex=(pagenum-1)*limit;
    let a=await mysql(`select * from xiaozu where sex=? limit ${pageindex},${limit}`,[sex])
    etx.body=a
})

//添加
router.post('/api/add',async (ctx)=>{
    let {name,age,sex}=ctx.request.body
    if(name&&age&&sex){//容错处理
        let data=await mysql('select * from xiaozu where name=?',[name])

        if(data.length){
            ctx.body={
                code:2,
                msg:'数据已存在'
            }
        }else{
            try{ //错误处理机制
                await mysql('insert into xiaozu (name,age,sex) values (?,?,?)',[name,age,sex])
                ctx.body={
                    code:0,
                    msg:'添加成功'
                }
            }catch(e){
                ctx.body={
                    code:2,
                    msg:e
                }
            }
        }
    }else{
        ctx.body={code:1,
        msg:"丢失参数"}
    }
})

//删除
router.delete('/api/delete',async (ctx)=>{
    let {id}=ctx.query
    

    if(id){
        try{
            await mysql('DELETE FROM xiaozu WHERE id=?',[id])
            ctx.body={
                code:1,
                msg:'删除成功'
            } 
        }catch(e){
            ctx.body={
                code:0,
                msg:e
            }        
        }
    }else{
        ctx.body={
            code:2,
            msg:'数据丢失'
        } 
    }
})

//修改
router.put('/api/update',async (ctx)=>{
    let {name,age,sex,id}=ctx.request.body
    await mysql('UPDATE xiaozu SET name = ?, age = ?, sex = ? WHERE id = ?', [name,age,sex,id])
})

app.listen(3000,()=>{
    console.log('启动成功')
})