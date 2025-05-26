// components/Sidebar.jsx
import React from "react";
import { Link } from "react-router-dom";
//import "./App.css"; // Optional for styling

function Sidebar() {
  return (
    <div className="sidebar">
      <ul>
        <li><Link to="/">BasicInfoPage</Link></li>
        <li><Link to="/voucher">Voucher</Link></li>
        <li><Link to="/membership">Membership</Link></li>
        <li><Link to="/promo">Promo Code</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;
