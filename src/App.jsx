import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import WeatherDetail from "./pages/Detail/Detail";
import Error from "./pages/Error/Error";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/weather/:city" element={<WeatherDetail />} />
          <Route path="/error" element={<Error />} />
          <Route path="*" element={<Navigate to="/error" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
