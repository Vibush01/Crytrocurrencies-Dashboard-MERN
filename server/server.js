const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 5000;
connectDB();

app.use(cors())
app.use(express.json());

app.get("/",(req,res)=>{
    res.send('Crypto Dashboard Backend!');
})


app.listen(PORT, (err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("Server Started");
    }

})