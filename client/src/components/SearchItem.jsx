export default function SearchItem(props) {
    return (
        <li>
        <div className="flex justify-start p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
          <div className="flex items-left">
            <input
              onClick={(e) => {
                document.getElementById('simple-search').value = e.target.id;
                props.setSymbol(e.target.id);
                setTimeout(() => {
                  props.setStocks(null);
                }
                , 500);
              }}
              id={props.symbol}
              name="helper-radio"
              type="radio"
              value=""
              className="text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
            ></input>
          </div>
          <div className="ml-2 text-sm">
            <label
              htmlFor={props.symbol}
              className="font-medium text-gray-900 dark:text-gray-300"
            >
              <div className="flex justify-start">{props.symbol}</div>
              <p
                id="helper-radio-text-4"
                className="flex justify-start text-xs font-normal text-gray-500 dark:text-gray-300"
              >
                {props.name}
              </p>
            </label>
          </div>
        </div>
      </li>
    )
}