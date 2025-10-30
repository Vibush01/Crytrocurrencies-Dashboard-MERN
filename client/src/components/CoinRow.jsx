export default function CoinRow({ coin }) {
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
    coin.priceChange24h > 0 ? "text-green-500" : "text-red-500";
  return (
    <>
      <tr className="border-b border-gray-700 hover:bg-gray-700">
        {/* Coin Name */}
        <td className="px-4 py-4 font-medium text-white whitespace-nowrap">
          {coin.name}
        </td>

        {/* Symbol */}
        <td className="px-4 py-4 text-gray-300 uppercase">{coin.symbol}</td>

        {/* Price */}
        <td className="px-4 py-4 text-gray-300">${formatNumber(coin.price)}</td>

        {/* 24h % Change */}
        <td className={`px-4 py-4 font-medium ${priceChangeColor}`}>
          {coin.priceChange24h.toFixed(2)}%
        </td>

        {/* Market Cap */}
        <td className="px-4 py-4 text-gray-300">
          ${formatNumber(coin.marketCap)}
        </td>

        {/* Last Updated */}
        <td className="px-4 py-4 text-gray-400 text-sm whitespace-nowrap">
          {formatTimestamp(coin.timestamp)}
        </td>
      </tr>
    </>
  );
}
