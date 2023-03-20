import {
  VictoryChart,
  VictoryLine,
  VictoryTheme,
  VictoryVoronoiContainer,
  VictoryScatter,
  VictoryTooltip,
} from 'victory';

const LineChart = (props) => {
  const { prices, results } = props;
  const startingCash = results.history[0].cash;
  const priceData = prices.map((price, i) => {
    return {
      x: new Date(price[1]),
      y: price[0],
      i: i,
    };
  });
  const resultsData = results.history.map((result, i) => {
    return {
      x: new Date(result.date),
      y: result.price,
      i: i,
      cash: result.cash,
      shares: result.shares,
      action: result.action
    };
  });
  return (
    <VictoryChart
      theme={VictoryTheme.material}
      width={800}
      height={400}
      domainPadding={20}
      x="time"
      containerComponent={
        <VictoryVoronoiContainer labels={({ datum }) => {
          if (datum.action) {
            return
          }
          return `Date: ${datum.x.toDateString()}
          Price: $${datum.y}`;
        }} />
      }
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
        labels={() => null}
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
      <VictoryScatter
        style={{
          data: { stroke: '#2a9d8f' },
        }}
        data={resultsData}
        animate={{
          duration: 2000,
          onLoad: { duration: 1000 },
        }}
        labelComponent={<VictoryTooltip />}
        labels={() => null}
        events={[{
          target: "data",
          eventHandlers: {
            onMouseOver: () => {
              return [ {
                  target: "labels",
                  mutation: (props) => {
                    if(props.datum.action === 'none'){
                      return { text: `Started trading with $${props.datum.cash}` };
                    }
                    return { text: `${props.datum.action.toUpperCase()} ${props.datum.shares} shares for $${props.datum.y}
                    new cash total is ${props.datum.cash}` };
                  }
                }
              ];
            },
            onMouseOut: () => {
              return [
                {
                  target: "labels",
                  mutation: () => null
                }
              ];
            }
        }
      }]}
        size={({ active }) => active ? 8 : 5}
      />
      
    </VictoryChart>
  );
};

export default LineChart;
