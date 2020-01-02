const mysq1=require('mysql');

module.exports=(aa,params=[])=>{
    //创建连接
    let connection=mysq1.createConnection({
        host:'localhost',
        port:'3306',
        user:'root',
        password:'root',
        database:'my1'
    })
    connection.connect((error)=>{
        if(error){
            console.log('连接失败')
        }else{
            console.log('连接成功')
        }
    })

    //查
    return new Promise(function(resolve,reject){
        connection.query(aa,params,(error,data)=>{
            if(error){
                reject(error)
            }else{
                resolve(data)
                connection.end()
            }
        })
    })

}