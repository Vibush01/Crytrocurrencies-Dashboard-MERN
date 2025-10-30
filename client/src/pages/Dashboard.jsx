import { useState, useEffect } from 'react';
import Header from '../components/Header';
import CoinRow from '../components/CoinRow';
import { fetchCoins, saveSnapshot, fetchCoinHistory } from '../services/api';

const REFRESH_INTERVAL = 30 * 60 * 1000;


const formatNumber = (num) => {
  if (num == null) return 'N/A';
  return num.toLocaleString();
};
const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleString();
};


function DashboardPage() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  
  const [showModal, setShowModal] = useState(false);
  const [historyData, setHistoryData] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [selectedCoinName, setSelectedCoinName] = useState(null);
 

  const loadCoins = async () => {
    try {
      if (coins.length === 0) {
        setLoading(true);
      }
      setError(null);
      const data = await fetchCoins();
      setCoins(data);
    } catch (err) {
      setError('Failed to fetch data. Please try again later.');
      console.error(err);
    } finally {
      if (loading) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    loadCoins();
    const intervalId = setInterval(loadCoins, REFRESH_INTERVAL);
    return () => clearInterval(intervalId);
  }, []);

  // Handler for the "Save Snapshot" 
  const handleSaveSnapshot = async () => {
    try {
      const response = await saveSnapshot();
      alert(response.message || 'Snapshot saved successfully!');
    } catch (err) {
      alert('Failed to save snapshot. Please try again.');
      console.error(err);
    }
  };

  const handleShowHistory = async (coinId, coinName) => {
    setSelectedCoinName(coinName); 
    setShowModal(true);
    setHistoryLoading(true);
    setHistoryData([]); 
    try {
      const data = await fetchCoinHistory(coinId);
      setHistoryData(data);
    } catch (err) {
      console.error(`Error fetching history for ${coinId}:`, err);
    } finally {
      setHistoryLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCoinName(null);
    setHistoryData([]);
  };
  // ---

  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderTableBody = () => {
    const colSpan = 7; 

    if (loading) {
      return (
        <tr>
          <td colSpan={colSpan} className="text-center py-8 text-gray-400">
            Loading data...
          </td>
        </tr>
      );
    }

    if (error) {
      return (
        <tr>
          <td colSpan={colSpan} className="text-center py-8 text-red-500">
            {error}
          </td>
        </tr>
      );
    }

    if (filteredCoins.length === 0) {
      return (
        <tr>
          <td colSpan={colSpan} className="text-center py-8 text-gray-400">
            No coins found.
          </td>
        </tr>
      );
    }

    return filteredCoins.map((coin) => (
      <CoinRow
        key={coin.coinId}
        coin={coin}
        onShowHistory={handleShowHistory}
      />
    ));
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Header />
      <main className="max-w-7xl mx-auto p-4 md:p-8">        
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
          <h2 className="text-2xl font-semibold">Top 10 Cryptocurrencies</h2>
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Search by name or symbol..."
              className="bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-auto"
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
            />
            <button
              onClick={handleSaveSnapshot}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Save Snapshot
            </button>
          </div>
        </div>
        <div className="bg-gray-800 shadow-md rounded-lg overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider hidden sm:table-cell">
                  Symbol
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Price (USD)
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  24h % Change
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider hidden md:table-cell">
                  Market Cap
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider hidden lg:table-cell">
                  Last Updated
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {renderTableBody()}
            </tbody>
          </table>
        </div>
      </main>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] flex flex-col">
            <div className="flex justify-between items-center p-4 border-b border-gray-700">
              <h3 className="text-xl font-semibold">
                {selectedCoinName} History
              </h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-white text-2xl"
              >
                &times;
              </button>
            </div>

            <div className="p-4 overflow-y-auto">
              {historyLoading ? (
                <p className="text-center text-gray-300 py-4">
                  Loading history...
                </p>
              ) : historyData.length === 0 ? (
                <p className="text-center text-gray-300 py-4">
                  No historical data found for this coin.
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-gray-700">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Timestamp
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Price (USD)
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider hidden sm:table-cell">
                          Market Cap
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {historyData
                        .slice(0)
                        .reverse()
                        .map((entry) => (
                          <tr key={entry._id}>
                            <td className="px-4 py-3 text-gray-300">
                              {formatTimestamp(entry.timestamp)}
                            </td>
                            <td className="px-4 py-3 text-gray-300">
                              ${formatNumber(entry.price)}
                            </td>
                            <td className="px-4 py-3 text-gray-300 hidden sm:table-cell">
                              ${formatNumber(entry.marketCap)}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardPage;