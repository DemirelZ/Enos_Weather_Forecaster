import React from "react";
import "../App.css";
import iconLogo from "../assests/images/iconLogo.png";

const Header: React.FC = () => {
  const handleLogoClick = () => {
    window.location.reload();
  };

  return (
    <header className="site-header">
      <div className="inner-container">
        <div
          className="left-content"
          onClick={handleLogoClick}
          style={{ cursor: "pointer" }}
        >
          <h1>Enos Weather Forecaster</h1>
        </div>
        <div className="right-content">
          <img
            src={iconLogo}
            alt="iconLogo"
            onClick={handleLogoClick}
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
