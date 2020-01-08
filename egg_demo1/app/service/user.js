const Service =require('egg').Service

class UserService extends Service{
    async getlist(){
        return await this.app.mysql.query('select * from xiaozu')
    }
    //判断次参数存不存在
    async username(user){
        return await this.app.mysql.query('select * from login where user=?',[user])
    }
    //注册
    async registory(user,password){
         await this.app.mysql.query('insert into login (user,password) values (?,?)',[user,password])
    }
    //登陆
    async login(user,password){
        return await this.app.mysql.query('select * from login where user=? and password=?',[user,password])
    }
}
module.exports=UserService