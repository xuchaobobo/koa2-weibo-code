

const {Sequelize,Model }= require('sequelize')
const { unset,clone,isArray} = require('lodash')
const { isProd } = require('../units/env')
const {
    MYSQL_CONF
} = require('../config/config')
const {host,user,password,dbName } = MYSQL_CONF

const conf = {
    dialect:'mysql',
    host,
    port,
    timezone:'+08:00',
    define:{

        paranoid:true,
        underscored:true,
        scopes:{
            bn:{
                attributes:{
                    enclude:['updatedAt', 'deletedAt', 'createdAt']
                }
            }
        }
    }
}

if(isTest){
    conf.logging=()=>{}
}

if(isProd){
    conf.pool={
        max:5, 
        min:0,
        idle:10000 //如果一个连接池 10 s 之类没有被使用，则释放
    }
}
const sequelize = new Sequelize(dbName,user,password,conf)


sequelize.sync({
    force:false
})

Model.prototype.toJSON=function(){
    //let data = this.dataValues
    let data = clone(this.dataValues)
    unset(data,'updated_at')
    unset(data,'created_at')
    unset(data,'deleted_at')
    for (key in data ){
        if(key === 'image'){
            if(!data[key].startsWith('http')){
                data[key]=global.config.host + data[key]
            }
        }
    }
    if(isArray(this.exclude)){
        this.exclude.forEach(element => {
            unset(data,element)
        });
    }
    return data
}
module.exports={
    sequelize
}