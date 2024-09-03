import React from "react";
import "../App.css";
import searcIcon from "../assests/images/searchIcon.png";
import { CustomSearchInputProps } from "../types/index";

const CustomSearchInput: React.FC<CustomSearchInputProps> = ({
  city,
  setCity,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit} className="input-container">
      <input
        type="text"
        className="custom-input"
        placeholder="Search a city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button type="submit" className="search-button-container">
        <img className="search-Icon" src={searcIcon} alt="searchIcon" />
      </button>
    </form>
  );
};

export default CustomSearchInput;
