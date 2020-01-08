'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  //获取列表
  router.post('/getlist',controller.user.index)

  //注册
  router.post('/registory',controller.user.registory)

  //登陆
  router.post('/login',controller.user.login)

  //录入成绩
  router.post('/addscore',controller.score.addscore)
};
