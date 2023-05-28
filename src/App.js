import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home.js";
import { Auth } from "./pages/auth";
import { InsertExcel } from "./pages/insertExcel";
import { SortingDashboard } from "./pages/sortingDashboard";
import { UnitDashboard } from "./pages/unitDashboard";
import { Navbar } from "./components/navbar.js";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Auth" element={<Auth />} />
          <Route path="/insertExcel" element={<InsertExcel />} />
          <Route path="/sortingDashboard" element={<SortingDashboard />} />
          <Route path="/unitDashboard" element={<UnitDashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
