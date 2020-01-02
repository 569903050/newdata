let mysql=require('mysql');

module.exports=()=>{
    //创建连接
let connection=mysq1.createConnection({
        host:'localhost',
        port:'3306',
        user:'root',
        pasword:'root',
        database:'my1'
    })
//连接数据库
connection.connect((error)=>{
    if(error){  
        console.log('数据库连接失败')
    }else{
        console.log('数据库连接成功')
    }
})
return new Promise(function(resolve,reject){
connection.query('select * from wode',(error,data)=>{
    if(error){
        reject(error)
    }else{
        resolve(data)
        connection.end()
    }
})
})

}
