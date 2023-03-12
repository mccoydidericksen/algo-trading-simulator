import StockSearch from './components/StockSearch';
import DatePicker from './components/DatePicker';
import InvestmentPicker from './components/InvestmentPicker';
import AlgoSelect from './components/AlgoSelect';
import React from 'react';

function App() {
  const [stocks, setStocks] = React.useState(null);
  const [symbol, setSymbol] = React.useState(null);
  const [startDate, setStartDate] = React.useState(6);
  const [investment, setInvestment] = React.useState(10000);
  const [algo, setAlgo] = React.useState(null);
  const [prices, setPrices] = React.useState(null);
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
              <button className="btn btn-primary">Submit</button>
            </div>
          </div>
        </div>
    </div>
  );
}

export default App;
