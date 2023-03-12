export default function AlgoSelect(props) {
  return (
    <select
      onChange={(e) => {
        props.setAlgo(e.target.value);
      }}
      defaultValue={props.algo ? props.algo : 'default'}
      className="select select-secondary w-96"
    >
      <option value="default" disabled>
        Pick your trading strategy
      </option>
      <option value="simpleMovingAvg">Simple Moving Average</option>
    </select>
  );
}
