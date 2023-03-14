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
        min="12"
        max="48"
        defaultValue="24"
        className="range range-primary"
        step="12"
      />
      <div className="w-96 flex justify-between text-xs px-2">
        <span>1 year ago</span>
        <span>2 years ago</span>
        <span>3 years ago</span>
        <span>4 years ago</span>
      </div>
    </div>
  );
}
