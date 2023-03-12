import StockSearch from './components/StockSearch';
import DatePicker from './components/DatePicker';
import InvestmentPicker from './components/InvestmentPicker';

function App() {
  return (
    <div className="flex h-screen justify-center items-center">
      <div className="flex grid grid-cols-1 gap-3 justify-center">
        <div className="card bg-neutral text-neutral-content p-5">
            <div className="card-body items-center text-center">
              <h2 className="card-title">Algo Trading Simulator</h2>
              <StockSearch />
              <DatePicker />
              <InvestmentPicker />
            </div>
          </div>
        </div>
    </div>
  );
}

export default App;
