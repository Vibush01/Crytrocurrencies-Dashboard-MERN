const mongoose = require("mongoose");

const coinDataSchema = new Schema({
  coinId: { type: String, required: true },
  name: { type: String, required: true },
  symbol: { type: String, required: true },
  price: { type: Number, required: true },
  marketCap: { type: Number, required: true },
  priceChange24h: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

const CurrentData = mongoose.model('CurrentData', coinDataSchema);
const HistoyData = mongoose.model('HistoryData', coinDataSchema);

module.exports = { CurrentData, HistoyData};
