const { Controller } = require("egg");

class UserController extends Controller {
  async index() {
    let { ctx, service } = this;
    let data = await service.user.getlist();
    ctx.body = data;
  }
  //注册
  async registory() {
    let { ctx, service } = this;
    let { user, password } = ctx.request.body;
    if (user && /\w{6,20}/.test(password)) {
      let data = service.user.username(user);
      if (data.length) {
        ctx.body = {
          code: "3",
          msg: "次账号已存在"
        };
      } else {
        try {
          service.user.registory(user, password);
          ctx.body = {
            code: "1",
            msg: "注册成功"
          };
        } catch (e) {
          ctx.body = {
            code: "0",
            msg: "注册失败"
          };
        }
      }
    } else {
      ctx.body = {
        code: "2",
        msg: "参数有误"
      };
    }
  }
  //登陆
  async login() {
    let { ctx, service } = this;
    let { user, password } = ctx.request.body;
    if (user && /\w{6,20}/.test(password)) {
        let data=await service.user.login(user,password)
        if(data.length){
            ctx.body = {
                code: "1",
                msg: "登陆成功"
              };
        }else{
            ctx.body = {
                code: "0",
                msg: "登陆失败"
              };
        }
    }else{
        ctx.body = {
            code: "2",
            msg: "参数有误"
          };
    }
  }
}
module.exports = UserController;
