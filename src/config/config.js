let MYSQL_CONF={
    dbName:'koa2-weibo-db',
    host:'localhost',
    port:3306,
    user:'root',
    password:'root'
}

if(isProd){
    READIS_CONF = {
        port:6379,
        host:'127.0.0.1'
    }
    MYSQL_CONF={
        dbName:'koa2-weibo-db',
        host:'localhost',
        port:3306,
        user:'root',
        password:'root'
    }
}

module.exports = {
    MYSQL_CONF
}