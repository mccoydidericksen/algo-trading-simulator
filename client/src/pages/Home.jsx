import React from 'react';
import axios from 'axios';
import StockSearch from '../components/StockSearch';
import DatePicker from '../components/DatePicker';
import InvestmentPicker from '../components/InvestmentPicker';
import AlgoSelect from '../components/AlgoSelect';
import Strategies from '../utils/tradingAlgos';
import LineChart from '../components/LineChart';
import ResultsCard from '../components/ResultsCard';
import { useMutation } from '@apollo/client';

import { ADD_RESULT } from '../utils/mutations';

function Home(props) {
  const [stocks, setStocks] = React.useState(null);
  const [symbol, setSymbol] = React.useState(null);
  const [startDate, setStartDate] = React.useState(6);
  const [investment, setInvestment] = React.useState(10000);
  const [algo, setAlgo] = React.useState(null);
  const [prices, setPrices] = React.useState(null);
  const [results, setResults] = React.useState(null);
  const baseURL =
    'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=';
  const selection = {
    symbol,
    startDate,
    investment,
    algo,
  };
  const [addResult, { error }] = useMutation(ADD_RESULT);
  return (
    <div>

        {prices && results && (
          <>
            <ResultsCard
              results={results}
              prices={prices}
              symbol={symbol}
              startingCash={investment}
              algo={algo}
            />
            <LineChart prices={prices} results={results} />
          </>
        )}
        <div className="card bg-neutral text-neutral-content p-4 mx-10 my-5">
          <div className="card-body items-center text-center space-y-3">
            <h2 className="card-title">Algo Trading Simulator</h2>
            <StockSearch
              setStocks={setStocks}
              setSymbol={setSymbol}
              symbol={symbol}
              stocks={stocks}
            />
            <DatePicker setStartDate={setStartDate} />
            <InvestmentPicker setInvestment={setInvestment} />
            <AlgoSelect setAlgo={setAlgo} algo={algo} />
            <button
              className="btn btn-primary"
              onClick={() => {
                if (!symbol || !startDate || !investment || !algo) {
                  alert('Please fill out all fields');
                  return;
                }
                axios
                  .get(
                    baseURL +
                      `${symbol}&outputsize=full&apikey=${
                        import.meta.env.VITE_API_KEY
                      }`
                  )
                  .then(async (response) => {
                    if (!response.data['Time Series (Daily)']) {
                      alert(JSON.stringify(response.data.Note));
                      return;
                    }
                    const filtered = Object.keys(
                      response.data['Time Series (Daily)']
                    ).filter((key) => {
                      const date = new Date(key);
                      const today = new Date();
                      const diff = Math.floor(
                        (today - date) / (1000 * 60 * 60 * 24)
                      );
                      return diff <= startDate * 30;
                    });
                    const filteredPrices = filtered
                      .map((key) => [
                        parseFloat(
                          response.data['Time Series (Daily)'][key]['4. close']
                        ),
                        key,
                      ])
                      .reverse();
                    const results = await Strategies[algo](
                      filteredPrices,
                      investment
                    );

                    if (filteredPrices && results) {
                      await setPrices(filteredPrices);
                      await setResults(results);
                      addResult({
                        variables: {
                          stock: symbol,
                          algorithm: algo,
                          initialInvestment: investment,
                          finalInvestment: results.cash,
                          startDate: results.history[0].date,
                          user: props.userId,
                          resultCreated: new Date().toDateString(),
                        },
                      });
                    }
                  });
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
  );
}

export default Home;
