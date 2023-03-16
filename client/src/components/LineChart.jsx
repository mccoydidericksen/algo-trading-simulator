import { VictoryChart, VictoryLine, VictoryTheme } from 'victory';

const LineChart = (props) => {
  const { prices, results } = props;
  const priceData = prices.map((price, i) => {
    return {
      x: new Date(price[1]),
      y: price[0],
    };
  });
  const resultsData = results.history.map((result, i) => {
    return {
        x: new Date(result.date),
        y: result.price,
    };
    });
  return (
    <VictoryChart
      theme={VictoryTheme.material}
      width={800}
      height={400}
      domainPadding={20}
      x="time"
    >
      <VictoryLine
        style={{
          data: { stroke: '#c43a31' },
        }}
        data={priceData}
        animate={{
          duration: 2000,
          onLoad: { duration: 1000 },
        }}
      />
      <VictoryLine
        style={{
          data: { stroke: '#2a9d8f' },
        }}
        data={resultsData}
        animate={{
          duration: 2000,
          onLoad: { duration: 1000 },
        }}
      />
    </VictoryChart>
  );
};

export default LineChart;
