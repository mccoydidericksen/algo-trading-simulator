import axios from 'axios';
import React from 'react';
import SearchItem from './SearchItem';

export default function StockSearch(props) {
  const apiKey = import.meta.env.VITE_API_KEY;
  const baseURL =
    'https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=';
  if(props.symbol !== null) {
    document.getElementById('simple-search').value = props.symbol;
  }

  return (
    <div>
      <div>
        <label htmlFor="simple-search" className="sr-only">
          Stock Search
        </label>
        <div className="relative w-96">
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
              props.setSymbol(e.target.value);
              if (e.target.value === '') return props.setStocks(null);
              axios
                .get(
                  baseURL +
                    `${e.target.value}&apikey=${import.meta.env.VITE_API_KEY}`
                )
                .then((response) => {
                  if(!response.data.bestMatches) {
                    alert(JSON.stringify(response.data.Note))
                    return
                  }
                  props.setStocks(response.data.bestMatches);
                });
            }}
            type="text"
            id="simple-search"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for a stock"
            required
          ></input>
        </div>
      </div>
      {props.stocks && props.stocks.length !== 0 && (
        <div
          onBlur={() => {
              props.setStocks(null);
          }}
          id="star"
          className="my-2 flex items-center w-full bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
        >
          <ul
            className="p-3 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownHelperRadioButton"
          >
            {props.stocks &&
              props.stocks.map((stock) => {
                return (
                  <SearchItem
                    key={stock['1. symbol']}
                    symbol={stock['1. symbol']}
                    name={stock['2. name']}
                    setSymbol={props.setSymbol}
                    setStocks={props.setStocks}
                  />
                );
              })}
          </ul>
        </div>
      )}
    </div>
  );
}
