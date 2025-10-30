import Header from "../components/header";
import CoinRow from "../components/CoinRow";


const dummyData = [
  {
    coinId: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'btc',
    price: 65432.10,
    priceChange24h: 1.25,
    marketCap: 1300000000000,
    timestamp: new Date().toISOString()
  },
  {
    coinId: 'ethereum',
    name: 'Ethereum',
    symbol: 'eth',
    price: 3512.45,
    priceChange24h: -0.55,
    marketCap: 420000000000,
    timestamp: new Date().toISOString()
  },
  {
    coinId: 'tether',
    name: 'Tether',
    symbol: 'usdt',
    price: 1.00,
    priceChange24h: 0.01,
    marketCap: 110000000000,
    timestamp: new Date().toISOString()
  }
];

export default function Dashboard(){
    return(
        <div className="bg-gray-900 min-h-screen text-white">
      <Header />

      <main className="max-w-7xl mx-auto p-4 md:p-8">
        <h2 className="text-2xl font-semibold mb-6">Top 10 Cryptocurrencies</h2>

        {/* Table Container */}
        <div className="bg-gray-800 shadow-md rounded-lg overflow-x-auto">
          <table className="min-w-full">
            {/* Table Headers */}
            <thead className="bg-gray-700">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Symbol</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Price (USD)</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">24h % Change</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Market Cap</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Last Updated</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-gray-700">
              {/* We map over our dummy data to create a CoinRow for each coin */}
              {dummyData.map((coin) => (
                <CoinRow key={coin.coinId} coin={coin} />
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
    )
}