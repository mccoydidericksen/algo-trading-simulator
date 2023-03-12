import StockSearch from "./components/StockSearch";
import DatePicker from "./components/DatePicker";

function App() {
  return (
    <div className="flex h-screen justify-center items-center">
      <div className="flex grid grid-cols-1 gap-3 justify-center">
      <StockSearch />
      <DatePicker />
      </div>
    </div>
  )
}

export default App
