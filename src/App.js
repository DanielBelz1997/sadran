import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Auth } from "./pages/auth";
import { InsertSoliderInfo } from "./pages/insertSoliderInfo";
import { SortingDashboard } from "./pages/sortingDashboard";
import { UnitDashboard } from "./pages/unitDashboard";
import { ParameterPage } from "./pages/sederHashivot";
import { Navbar } from "./components/navbar.js";
import { Home } from "./pages/home.js";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Auth" element={<Auth />} />
          <Route path="/insertSoliderInfo" element={<InsertSoliderInfo />} />
          <Route path="/sortingDashboard" element={<SortingDashboard />} />
          <Route path="/unitDashboard" element={<UnitDashboard />} />
          <Route path="/sederHashivot" element={<ParameterPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
