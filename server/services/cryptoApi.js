const axios = require('axios');

const fetchTopTenCoins = async () =>{
    try{
        const response  = await axios.get(process.env.COINGECKO_API_URL);
        const data = response.data;
        
        const formattedData = data.map(coin=>({
            coinId: coin.id,
            name: coin.name,
            symbol: coin.symbol,
            price: coin.current_price,
            marketCap: coin.market_cap,
            priceChange24h: coin.price_change_percentage_24h,
            timestamp: new Date(coin.last_updated)

        }))
        return formattedData;
    }catch(err){
        console.log("Error fetching Data from CoinGecko", err.message)
        return null;
    }
}

module.exports = {fetchTopTenCoins}