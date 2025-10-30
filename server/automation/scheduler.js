const cron = require('node-cron');
const {fetchTopTenCoins} = require('../services/cryptoApi')
const { CurrentData, HistoryData} = require('../models/coinData') 

// 30 Mins schedule
cron.schedule('*/30 * * * *',async ()=>{
    console.log("30 mins scheduler running")
    try{
        const coinData = await fetchTopTenCoins();
        if(coinData){
            await CurrentData.deleteMany({})
            await CurrentData.insertMany(coinData)
            console.log("Current data updated")
        }
    }catch(err){
        console.log("Error in 30 mins scheduler", err.message)
    }
})

// 60 mins scheduler
cron.schedule('0 * * * *',async ()=>{
    console.log("60 mins scheduler running")
    try{
        const coinData = await fetchTopTenCoins();
        if(coinData){
            await HistoryData.insertMany(coinData)
            console.log("history data updated")
        }
    }catch(err){
        console.log("Error in 30 mins scheduler", err.message)
    }
})