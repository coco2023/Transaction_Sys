import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css"; // Assuming you have a separate CSS file for navigation

const Navigation = () => {
  const couponMessage =
    "🎉 Free Shipping on orders over $50 - Use code: FREESHIP 🎉";

  return (
    <div className="top-bar">
      <div className="coupon-message" data-content={couponMessage}>
        <p>{couponMessage}</p>
      </div>

      <div className="nav-container">

        <div className="nav-logo">UmiUni</div>

        <div className="nav-search">
          <input className="search-input" type="text" placeholder="Search..." />
          <button className="search-button">🔍</button>
        </div>

        <div className="nav-menu">
          <Link className="nav-link" to="/">
            🏠 Home
          </Link>
          <Link className="nav-link" to="/cancel">
            ❌ Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
