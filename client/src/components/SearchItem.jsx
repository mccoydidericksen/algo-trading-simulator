export default function SearchItem(props) {
    return (
        <li>
        <div className="flex p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
          <div className="flex items-center">
            <input
              id="helper-radio-4"
              name="helper-radio"
              type="radio"
              value=""
              className="text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
            ></input>
          </div>
          <div className="ml-2 text-sm">
            <label
              htmlFor="helper-radio-4"
              className="font-medium text-gray-900 dark:text-gray-300"
            >
              <div>{props.symbol}</div>
              <p
                id="helper-radio-text-4"
                className="text-xs font-normal text-gray-500 dark:text-gray-300"
              >
                {props.name}
              </p>
            </label>
          </div>
        </div>
      </li>
    )
}