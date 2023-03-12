export default function InvestmentPicker() {
  return (
    <div>
        <label className="mx-2 text-sm font-medium text-gray-700 dark:text-gray-200">
            Investment Amount
        </label>
      <input
        type="range"
        min="2000"
        max="22000"
        defaultValue="10000"
        className="range range-success"
        step="4000"
      />
      <div className="w-96 flex justify-between text-xs px-2">
        <span>$2K</span>
        <span>$6K</span>
        <span>$10K</span>
        <span>$14K</span>
        <span>$18K</span>
        <span>$22K</span>
      </div>
    </div>
  );
}
