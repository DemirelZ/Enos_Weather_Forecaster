import React from "react";
import icons from "../assests/icons/icons";
import { WeatherIconProps } from "../types";

const WeatherIcon: React.FC<WeatherIconProps> = ({ iconId }) => {
  const iconSrc = icons[iconId] || icons[1];

  return <img src={iconSrc} alt={`Icon for ID ${iconId}`} />;
};

export default WeatherIcon;
