export default function DatePicker(props) {
  return (
    <div>
      <label className="mx-2 text-sm font-medium text-gray-700 dark:text-gray-200">
        Trading Start
      </label>
      <input
        onChange={(e) => {
          props.setStartDate(parseInt(e.target.value));
        }}
        type="range"
        min="3"
        max="12"
        defaultValue="6"
        className="range range-primary"
        step="3"
      />
      <div className="w-96 flex justify-between text-xs px-2">
        <span>3 months ago</span>
        <span>6 months ago</span>
        <span>9 months ago</span>
        <span>1 year ago</span>
      </div>
    </div>
  );
}
