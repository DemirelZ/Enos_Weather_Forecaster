import React from "react";
import "../App.css";
import iconLogo from "../assests/images/iconLogo.png";

const Header: React.FC = () => {
  return (
    <header className="site-header">
      <div className="inner-container">
        <div className="left-content">
          <h1>Enos Weather Forecaster</h1>
        </div>
        <div className="right-content">
          <img src={iconLogo} alt="iconLogo" />
        </div>
      </div>
    </header>
  );
};

export default Header;
