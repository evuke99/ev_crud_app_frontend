import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages and components
import Home from "./Pages/Home";

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <div className="pages min-h-screen h-full bg-base-100">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}
export default App;
