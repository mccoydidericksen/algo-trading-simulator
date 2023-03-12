import axios from 'axios';
import React from 'react';
import DatePicker from './DatePicker';
import SearchItem from './SearchItem';

export default function StockSearch() {
  const apiKey = import.meta.env.VITE_API_KEY;
  const baseURL =
    'https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=';

  const [stocks, setStocks] = React.useState(null);

  return (
    <div>
      <form className="flex items-center">
        <label htmlFor="simple-search" className="sr-only">
          Search
        </label>
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            onChange={(e) => {
              e.preventDefault();
              if (e.target.value === '') return setStocks(null);
              axios
                .get(
                  baseURL +
                    `${e.target.value}&apikey=${import.meta.env.VITE_API_KEY}`
                )
                .then((response) => {
                  setStocks(response.data.bestMatches);
                });
            }}
            type="text"
            id="simple-search"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search"
            required
          ></input>
        </div>
      </form>
      {stocks && stocks.length !== 0 && (
        <div
          id="dropdownHelperRadio"
          className="flex items-center w-full bg-white divide-y divide-gray-100 rounded-lg shadow w-60 dark:bg-gray-700 dark:divide-gray-600"
        >
          <ul
            className="p-3 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownHelperRadioButton"
          >
            {stocks &&
              stocks.map((stock) => {
                return (
                  <SearchItem
                    key={stock['1. symbol']}
                    symbol={stock['1. symbol']}
                    name={stock['2. name']}
                  />
                );
              })}
          </ul>
        </div>
      )}

      <DatePicker />
    </div>
  );
}
