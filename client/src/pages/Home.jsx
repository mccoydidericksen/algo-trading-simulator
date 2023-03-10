import axios from "axios";
import React from "react";

const baseURL = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=IBM&outputsize=full&apikey=demo";

export default function Home() {
  const [stocks, setStocks] = React.useState(null);
  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setStocks(response.data);
    });
  }, []);

  if (!stocks) return null;

  return (
    <div>
      <p>{JSON.stringify(stocks)}</p>
    </div>
  );
}