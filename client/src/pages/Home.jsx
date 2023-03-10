import axios from "axios";
import React from "react";

const baseURL = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=IBM&outputsize=full&apikey=demo";

export default function Home() {
  const [post, setPost] = React.useState(null);

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setPost(response.data);
    });
  }, []);

  if (!post) return null;

  return (
    <div>
      <p>{JSON.stringify(post)}</p>
    </div>
  );
}