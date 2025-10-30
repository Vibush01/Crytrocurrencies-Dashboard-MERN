const express = require('express');
const router = express.Router();


const { CurrentData, HistoryData} = require('../models/coinData');
const {fetchTopTenCoins} = require('../services/cryptoApi')


// api/coins - get top 10 coins data from CurrentData stored in mongodb
router.get('/coins', async (req, res)=>{
    try{
        const data = await CurrentData.find().sort({ marketCap: -1 }); 
        res.json(data);
    }catch(err){
        console.error("Error fetching current coin data", err.message   )
    }
})

// api/history - to get a snapshot 
router.post('/history', async(req,res)=>{
    try{
        const coinData = await fetchTopTenCoins();
        if(coinData){
            await HistoryData.insertMany(coinData);
            res.status(201).json({message: 'History snapshot saved successfully.', data: coinData })
        }else{
            res.status(500).json({ message: 'Failed to fetch coin data from API.' });
        }
    }catch(err){
        console.error("Error in saving manual snapshot", err.message);
        res.status(500).json({ message: 'Server error while saving history.' });
    }


})


// api/history/:coinId - to get history of particular coinId
router.get('/history/:coinId', async (req,res)=>{

    try{
        const {coinId} = req.params;
        const data = await HistoryData.find({coinId}).sort({timestamp:1});

        if(data.length === 0){
            return res.status(404).json({ message: 'No history found for this coin.' });
        }

        res.json(data);

    }catch(err){
        console.error("Error fetching coin histroy", err.message )
        res.status(500).json({ message: 'Server error while fetching coin history.' })
    }
})

module.exports = router;