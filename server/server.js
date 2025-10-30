const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const { fetchTopTenCoins } = require('./services/cryptoApi');

require('dotenv').config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors())
app.use(express.json());

app.get("/",(req,res)=>{
    res.send('Crypto Dashboard Backend!');
})

app.get('/test-fetch', async (req, res) => {
  const data = await fetchTopTenCoins();
  if (data) {
    res.json(data);
  } else {
    res.status(500).json({ message: 'Error fetching data' });
  }
});

app.listen(PORT, (err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("Server Started");
    }

})