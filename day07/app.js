const Koa = require('koa');

const app = new Koa();

const bodyparser = require('koa-bodyparser');

const router = require('koa-router')();

const query = require('./db/index');

const moment = require('moment');

const secret = '1707d';

app.use(bodyparser());

app.use(router.routes());

app.use(router.allowedMethods());

const crypto = require('crypto');

//接口

//注册接口
router.post("/api/registry",async (ctx) => {
    let {phone,password} = ctx.request.body;
    if(/1[3-9]\d{9}/.test(phone) && /\w{6,20}/.test(password)){
        //1.排重
        let data = await query('select * from userlist where phone=?',[phone]);

        if(data.length){
            //已经存在
            ctx.body = {
                code:3,
                msg:'此手机已注册'
            }
        }else{
            try{    
                const newPwd = crypto.createHmac('sha256', secret)
                   .update(password)
                   .digest('hex');
                await query('insert into userlist (phone,password) values (?,?)',[phone,newPwd]);
                ctx.body = {
                    code:1,
                    msg:'注册成功'
                }
            }catch(e){
                ctx.body = {
                    code:0,
                    msg:'注册失败'
                }
            }
        }
        
    }else{
        ctx.body = {
            code:2,
            msg:'参数有误'
        }
    }

})

//登录
router.post('/api/login',async ctx => {
    let {phone,password} = ctx.request.body;
    if(/1[3-9]\d{9}/.test(phone) && /\w{6,20}/.test(password)){
        const newPwd = crypto.createHmac('sha256', secret)
            .update(password)
            .digest('hex');
        let data = await query('select * from userlist where phone=? and password=?',[phone,newPwd]);

        if(data.length){
            ctx.body = {
                code:1,
                msg:'登录成功'
            }
        }else{
            ctx.body = {
                code:0,
                msg:'登录失败'
            }
        }
    }else{
        ctx.body = {
            code:2,
            msg:'参数有误'
        }
    }
})

//查询今天是否可以签到
router.get('/api/isSign',async ctx => {
    let {uid} = ctx.request.body;
    if(uid){
        let formatTime = moment(new Date()).format('YYYY-MM-DD');
        let signCount = await query('select count(*) from sign_list where date_format(time,"%Y-%m-%d")=? and uid=?',[formatTime,uid]);
        if(signCount[0]['count(*)'] < 2){
            ctx.body = {
                code:1,
                status:true
            }
        }else{
            ctx.body = {
                code:1,
                status:false
            }
        }
    }else{
        ctx.body = {
            code:2,
            msg:'参数有误'
        }
    }
})

//签到
router.post('/api/sign',async ctx => {
    let {uid} = ctx.request.body;
    let formatTime = moment(new Date()).format('YYYY-MM-DD');
    if(uid){
        //可以签到
        try{
            let time = new Date(); //2020-01-06
            await query('insert into sign_list (time,uid) values (?,?)',[time,uid]);

            //签到的天数

            ctx.body = {
                code:1,
                msg:'签到成功'
            }
        }catch(e){
            ctx.body = {
                code:0,
                msg:'签到失败'
            }
        }
    }else{
        ctx.body = {
            code:2,
            msg:'参数有误'
        }
    }
})

//查询签到的天数
router.get('/api/days',async ctx => {
    let {uid} = ctx.query;
    if(uid){
        let list = await query('select * from sign_list where uid=?',[uid]);

        let obj = {};

        let num = 0;

        //排重
        list.forEach(item => {
            let time = moment(item.time).format('YYYY-MM-DD'); //2020-01-06
            if(!obj[time]){
                obj[time] = time;
                num++;
            }
        })

        ctx.body = {
            code:1,
            num
        }
    }else{
        ctx.body = {
            code:2,
            msg:'参数有误'
        }
    }
})


app.listen(3000,() => {
    console.log("服务启动成功")
})