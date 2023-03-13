import StockSearch from './components/StockSearch';
import DatePicker from './components/DatePicker';
import InvestmentPicker from './components/InvestmentPicker';
import AlgoSelect from './components/AlgoSelect';
import React from 'react';
import axios from 'axios';

function App() {
  const [stocks, setStocks] = React.useState(null);
  const [symbol, setSymbol] = React.useState(null);
  const [startDate, setStartDate] = React.useState(6);
  const [investment, setInvestment] = React.useState(10000);
  const [algo, setAlgo] = React.useState(null);
  const [prices, setPrices] = React.useState(null);
  const baseURL = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=';
  console.log(prices)
  const selection = {
    symbol,
    startDate,
    investment,
    algo,
  };
  return (
    <div className="flex h-screen justify-center items-center">
      <div className="flex grid grid-cols-1 gap-3 justify-center">
        <div className="card bg-neutral text-neutral-content p-5">
            <div className="card-body items-center text-center space-y-3">
              <h2 className="card-title">Algo Trading Simulator</h2>
              <StockSearch setStocks={setStocks} setSymbol={setSymbol} symbol={symbol} stocks={stocks}/>
              <DatePicker setStartDate={setStartDate}/>
              <InvestmentPicker setInvestment={setInvestment}/>
              <AlgoSelect setAlgo={setAlgo} algo={algo}/>
              <button className="btn btn-primary"
                onClick={() => {
                  console.log(selection);
                  axios
                    .get(baseURL + `${symbol}&outputsize=full&apikey=${import.meta.env.VITE_API_KEY}`)
                    .then((response) => {
                      const filtered = Object.keys(response.data['Time Series (Daily)']).filter((key) => {
                        const date = new Date(key);
                        const today = new Date();
                        const diff = Math.floor((today - date) / (1000 * 60 * 60 * 24));
                        return diff <= startDate * 30;
                      });
                      setPrices(filtered.map((key) => [parseInt(response.data['Time Series (Daily)'][key]['4. close']), key]));
                    });
                }}
              >Submit</button>
            </div>
          </div>
        </div>
    </div>
  );
}

export default App;
