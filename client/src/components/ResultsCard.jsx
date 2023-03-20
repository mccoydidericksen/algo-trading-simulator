import React from 'react';
import LineChart from './LineChart';

const ResultsCard = (props) => {
    const { results, symbol, startingCash} = props;
    const prices = props.prices.map((price) => {
        return [price[0], new Date(price[1])];
    });
    const { cash } = results;
    return (
        <div className="card bg-neutral text-neutral-content p-3 mx-3">
            <div className="card-body items-center text-center space-y-2">
                <h2 className="card-title font-bold underline">Results</h2>
                <h3 className="card-subtitle"><span className="font-bold">Symbol:</span> {symbol}</h3>
                <h3 className="card-subtitle"><span className="font-bold">Starting Cash:</span>  ${startingCash}</h3>
                <h3 className="card-subtitle"><span className="font-bold">Ending Cash:</span>  ${cash}</h3>
                <h3 className="card-subtitle"><span className="font-bold">Profit:</span>  ${Math.round((cash - startingCash) * 100) / 100}</h3>
                <p className="text-sm">The <span className="text-red-500">red</span> line represents historic stock prices while the <span className="text-green-500">green</span> line represents buy/sell actions performed by the selected algorithm. <span className="font-semibold">Hover over grey points to view buy/sell details.</span></p>
            </div>
        </div>
    );
}
export default ResultsCard;