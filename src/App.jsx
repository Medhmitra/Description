import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import VoucherPage from "./pages/VoucherPage";
import MembershipPage from "./pages/MembershipPage";
import PromoCodePage from "./pages/PromoCodePage";
import BasicInfoPage from "./pages/BasicInfoPage"; // ✅ New page for your basic info form

function App() {
  return (
    <Router>
      <div className="navbar">Salon Service</div>
      <div className="app-layout">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<BasicInfoPage />} />
            <Route path="/voucher" element={<VoucherPage />} />
            <Route path="/membership" element={<MembershipPage />} />
            <Route path="/promo" element={<PromoCodePage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
