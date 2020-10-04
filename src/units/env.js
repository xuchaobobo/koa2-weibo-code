const ENV = process.env.NOOD_ENV

module.exports={
    isDev:ENV==='dev',
    notDev:ENV!=='dev',
    isProd:ENV==='production',
    notProd:ENV!=='production',
    isTest:ENV==='test',
    notTest:ENV!=='test'
}