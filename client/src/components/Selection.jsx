import React from 'react';
import axios from 'axios';
import StockSearch from './StockSearch';
import DatePicker from './DatePicker';
import InvestmentPicker from './InvestmentPicker';
import AlgoSelect from './AlgoSelect';
import Strategies from '../utils/tradingAlgos';

function Selection(props) {
    const { setStocks, setSymbol, symbol, stocks, setStartDate, setInvestment, setAlgo, algo, baseURL, setPrices, setResults, startDate, investment} = props;
  return (
        <div className="card bg-neutral text-neutral-content p-5">
            <div className="card-body items-center text-center space-y-3">
              <h2 className="card-title">Algo Trading Simulator</h2>
              <StockSearch setStocks={setStocks} setSymbol={setSymbol} symbol={symbol} stocks={stocks}/>
              <DatePicker setStartDate={setStartDate}/>
              <InvestmentPicker setInvestment={setInvestment}/>
              <AlgoSelect setAlgo={setAlgo} algo={algo}/>
              <button className="btn btn-primary"
                onClick={() => {
                  if (!symbol || !startDate || !investment || !algo) {
                    alert('Please fill out all fields');
                    return;
                  }
                  axios
                    .get(baseURL + `${symbol}&outputsize=full&apikey=${import.meta.env.VITE_API_KEY}`)
                    .then(async (response) => {
                      if(!response.data['Time Series (Daily)']) {
                        alert(JSON.stringify(response.data.Note))
                        return
                      }
                      const filtered = Object.keys(response.data['Time Series (Daily)']).filter((key) => {
                        const date = new Date(key);
                        const today = new Date();
                        const diff = Math.floor((today - date) / (1000 * 60 * 60 * 24));
                        return diff <= startDate * 30;

                      });
                      const filteredPrices = filtered.map((key) => [parseFloat(response.data['Time Series (Daily)'][key]['4. close']), key]).reverse();
                      const results = await Strategies[algo](filteredPrices, investment);
                      localStorage.setItem('results', JSON.stringify(results));
                      localStorage.setItem('prices', JSON.stringify(filteredPrices));
                      await setPrices(filteredPrices);
                      await setResults(results);
                    });
                }}
              >Submit</button>
            </div>
          </div>
  );
}

export default Selection;