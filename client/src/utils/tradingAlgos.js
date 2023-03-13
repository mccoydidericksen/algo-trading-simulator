const Strategies = {
  simpleMovingAvg: (prices, cash) => {
    const initialCash = cash;
    // Set the length of the moving average window and shares to 0
    const maLength = 5;
    let shares = 0;
    // An array to hold the moving averages
    const movingAverages = [];

    // Calculate the moving averages
    for (let i = maLength; i <= prices.length; i++) {
      const sum = prices.slice(i - maLength, i).reduce((acc, val) => {
        return acc + val[0];
      }, 0);
      const ma = Math.round((sum / maLength) * 100) / 100;
      movingAverages.push(ma);
    }

    const tradingHistory = {
      cash: cash,
      buyCount: 0,
      sellCount: 0,
      history: [
        {
          cash: cash,
          shares: shares,
          price: prices[0][0],
          date: prices[0][1],
          action: 'none',
        },
      ],
    };

    // Buy or sell based on the moving average crossover
    for (let i = maLength; i < prices.length; i++) {
      const prevMA = movingAverages[i - maLength];
      const currMA = movingAverages[i - maLength + 1];
      const price = prices[i][0];
      if (prevMA < price && currMA >= price) {
        // Sell all shares
        cash += shares * price;
        if (tradingHistory.buyCount > tradingHistory.sellCount) {
          const history = {
            cash,
            shares,
            price: prices[i][0],
            date: prices[i][1],
            action: 'sell',
          };
          tradingHistory.history.push(history);
          tradingHistory.sellCount++;
        }
        shares = 0;
      } else if (prevMA >= price && currMA < price) {
        // Buy as many shares as possible
        shares += Math.floor(cash / price);
        cash -= shares * price;
        if (tradingHistory.sellCount >= tradingHistory.buyCount) {
          const history = {
            cash,
            shares,
            price: prices[i][0],
            cost: shares * price,
            date: prices[i][1],
            action: 'buy',
          };
          tradingHistory.history.push(history);
          tradingHistory.buyCount++;
        }
      }
    }
    if (shares > 0) {
      cash += shares * prices[prices.length - 1][0];
      tradingHistory.history.push({
        cash,
        shares,
        price: prices[prices.length - 1][0],
        date: prices[prices.length - 1][1],
        action: 'sell',
      });
      tradingHistory.sellCount++;
    }

    tradingHistory.cash = cash;
    tradingHistory.profit = cash - initialCash;
    return tradingHistory;
  },
};

export default Strategies;
