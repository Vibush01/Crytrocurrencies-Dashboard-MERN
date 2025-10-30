export default function CoinRow({ coin, onShowHistory }) {
  // Helper to format large numbers with commas
  const formatNumber = (num) => {
    return num.toLocaleString();
  };

  // Helper to format the timestamp
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  // Determine text color based on positive or negative change
  const priceChangeColor =
    coin.priceChange24h > 0 ? 'text-green-500' : 'text-red-500';
  return (
    <>
      <tr className="border-b border-gray-700 hover:bg-gray-700">
        {/* Coin Name */}
        <td className="px-4 py-4 font-medium text-white whitespace-nowrap">
          {coin.name}
        </td>

        {/* Symbol (Hidden by default, shown on 'sm' screens and up) */}
        <td className="px-4 py-4 text-gray-300 uppercase  sm:table-cell">
          {coin.symbol}
        </td>

        {/* Price */}
        <td className="px-4 py-4 text-gray-300">${formatNumber(coin.price)}</td>

        {/* 24h % Change */}
        <td className={`px-4 py-4 font-medium ${priceChangeColor}`}>
          {coin.priceChange24h.toFixed(2)}%
        </td>

        {/* Market Cap (Hidden by default, shown on 'md' screens and up) */}
        <td className="px-4 py-4 text-gray-300  md:table-cell">
          ${formatNumber(coin.marketCap)}
        </td>

        {/* Last Updated (Hidden by default, shown on 'lg' screens and up) */}
        <td className="px-4 py-4 text-gray-400 text-sm whitespace-nowrap lg:table-cell">
          {formatTimestamp(coin.timestamp)}
        </td>
        <td className="px-4 py-4 text-center">
          <button
            onClick={() => onShowHistory(coin.coinId, coin.name)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm font-medium transition-colors"
          >
            View History
          </button>
        </td>
      </tr>
    </>
  );
}