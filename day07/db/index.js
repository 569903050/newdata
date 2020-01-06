const mysql = require('mysql');

module.exports = (sql,params=[]) =>{
    //1.创建连接对象
    const connection = mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'root',
        port:3306,
        database:'1707d-zk2'
    })

    //2.连接

    connection.connect((error) => {
        if(error){
            console.log("数据库失败")
        }else{
            console.log("数据库连接成功")
        }
    })

    //3.增删改查  query(sql语句,[传参],(error,data)=>{})

    return new Promise((resovle,reject) => {
        connection.query(sql,params,(error,data) => {
            if(error){
                reject(error)
            }else{
                resovle(data)
            }
            //4.关闭链接
            connection.end();
        }) 
    })
}

