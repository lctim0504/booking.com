import "./app.scss"
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HotelList from "./pages/HotelList";
import HotelInfo from "./pages/HotelInfo";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hotelsList" element={<HotelList />} />
          <Route path="/hotels/:id" element={<HotelInfo />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
