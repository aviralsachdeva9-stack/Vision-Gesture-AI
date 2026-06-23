import "./app.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Detector from "./Pages/Detector";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App grain">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detector" element={<Detector />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;