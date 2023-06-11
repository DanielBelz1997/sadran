import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Auth } from "./pages/auth";
import { InsertSoliderInfo } from "./pages/insertSoliderInfo";
import { InsertAdditionalData } from "./pages/insertAditionalData";
import { SortingDashboard } from "./pages/sortingDashboard";
import { UnitDashboard } from "./pages/unitDashboard";
import { Navbar } from "./components/navbar.js";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<InsertSoliderInfo />} />
          <Route path="/Auth" element={<Auth />} />
          <Route path="/insertSoliderInfo" element={<InsertSoliderInfo />} />
          <Route
            path="/InsertAdditionalData"
            element={<InsertAdditionalData />}
          />
          <Route path="/sortingDashboard" element={<SortingDashboard />} />
          <Route path="/unitDashboard" element={<UnitDashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
