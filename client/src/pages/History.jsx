import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_RESULTS } from '../utils/queries';

const History = (props) => {
  const userId = props.userId;
  const { error, data } = useQuery(QUERY_RESULTS, {
    variables: { userId },
  });
  const [history, setHistory] = useState([]);
  useEffect(() => {
    if (data) {
      setHistory(data.results);
    }
  }, [data]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center items-center gap-3">
      {history.map((result) => {
        const isSuccessful = result.finalInvestment > result.initialInvestment;
        return (  
          <div key={result._id} className="stats shadow">
            <div className="stat">
              <div className="stat-value text-lg">{result.stock} - {result.algorithm}</div>
              <div className="stat-title text-sm">{new Date(result.startDate).toLocaleDateString()} to {new Date(result.resultCreated).toLocaleDateString()}</div>
              <div className={"stat-value " + (isSuccessful ? 'text-success': 'text-error') }>${result.finalInvestment}</div>
              <div className="stat-desc">Beginning investment: ${result.initialInvestment}</div>
              <div className="stat-value text-lg">Profit Percentage: <span className={(isSuccessful ? 'text-success': 'text-error')}>{Math.round(((result.finalInvestment - result.initialInvestment) / result.initialInvestment) * 10000) / 100}%</span></div>  
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default History;
