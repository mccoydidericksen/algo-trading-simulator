import Home from "./pages/Home";

function App() {
  console.log(import.meta.env.VITE_API_KEY)

  return (
    <div>
      <Home />
    </div>
  )
}

export default App
