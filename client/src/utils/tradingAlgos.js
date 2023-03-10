export default Strategies = {
    simpleMovingAvg: (cash, prices) => {
        // Set the length of the moving average window and shares to 0
            const maLength = 3;
            let shares = 0;
            // An array to hold the moving averages
            const movingAverages = [];

            // Calculate the moving averages
            for (let i = maLength; i <= prices.length; i++) {
            const sum = prices.slice(i - maLength, i).reduce((acc, val) => acc + val);
            const ma = sum / maLength;
            movingAverages.push(ma);
            }

            // Buy or sell based on the moving average crossover
            for (let i = maLength; i < prices.length; i++) {
            const prevMA = movingAverages[i - maLength];
            const currMA = movingAverages[i - maLength + 1];
            const price = prices[i];
            if (prevMA < price && currMA >= price) {
                // Sell all shares
                cash += shares * price;
                shares = 0;
            } else if (prevMA >= price && currMA < price) {
                // Buy as many shares as possible
                shares += Math.floor(cash / price);
                cash -= shares * price;
            }
            }
            return [cash.toFixed(2), shares];

    }
}