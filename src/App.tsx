import React, { useState } from "react";
import "./App.css";
import image1 from "./assests/images/image1.png";
import image2 from "./assests/images/image2.png";
import { capitalizeFirstLetter, formatCustomDate } from "./utils/functions";
import { CacheData, WeatherData } from "./types";
import { getDataForAWeek, getDataForCurrentDay } from "./api/fetchData";
import CustomSearchInput from "./components/customSearchInput";
import Header from "./components/header";
import WeatherIcon from "./components/weatherIcon";
import Loading from "./components/loading";

function App() {
  const [city, setCity] = useState<string>("");
  const [searchedCity, setSearchedCity] = useState<string>("");
  const [weatherDataForAWeek, setWeatherDataForAWeek] = useState<WeatherData[]>(
    []
  );
  const [weatherDataForCurrentDay, setWeatherDataForCurrentDay] = useState<
    WeatherData | null | undefined
  >(null);
  const [selectedDay, setSelectedDay] = useState<
    WeatherData | null | undefined
  >(null);
  const [showCity, setShowCity] = useState<boolean>(false);
  const [loadingWeekData, setLoadingWeekData] = useState<boolean>(false);
  const [loadingCurrentDayData, setLoadingCurrentDayData] =
    useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  console.log("city", city);
  console.log("searchedCity", searchedCity);
  console.log("weatherDataForCurrentDay", weatherDataForCurrentDay);

  const cache: Record<string, CacheData> = {}; // Önbellek

  const fetchWeatherDataForCurrentDay = async (city: string) => {
    if (cache[city]?.current) {
      setWeatherDataForCurrentDay(cache[city].current);
      setError(false);
      return;
    }

    setLoadingCurrentDayData(true);
    try {
      const data = await getDataForCurrentDay(city);
      if (!data || !data.weather) {
        throw new Error("Invalid data received");
      }
      setWeatherDataForCurrentDay(data);
      setError(false);
      cache[city] = { ...cache[city], current: data };
    } catch (error) {
      console.error("API isteği başarısız:", error);
      setShowCity(false);
      setError(true);
    } finally {
      setLoadingCurrentDayData(false);
    }
  };

  const fetchWeatherDataForAWeek = async (city: string) => {
    if (cache[city]?.week) {
      setWeatherDataForAWeek(cache[city].week || []);
      setSearchedCity(city);
      setSelectedDay(null);
      setShowCity(true);
      setError(false);
      return;
    }

    setLoadingWeekData(true);
    try {
      const data = await getDataForAWeek(city);
      if (!data || !data.length) {
        throw new Error("Invalid data received");
      }
      setWeatherDataForAWeek(data);
      setSearchedCity(city);
      setSelectedDay(null);
      setShowCity(true);
      setError(false);
      cache[city] = { ...cache[city], week: data };
    } catch (error) {
      console.error("API isteği başarısız:", error);
      setShowCity(false);
      setError(true);
    } finally {
      setLoadingWeekData(false);
    }
  };

  const handleSearch = () => {
    if (city) {
      fetchWeatherDataForAWeek(city);
      fetchWeatherDataForCurrentDay(city);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleSearch();
  };

  const handleDayClick = (day: WeatherData) => {
    setSelectedDay(day);
  };

  return (
    <>
      <Header />
      <div className="container">
        {weatherDataForAWeek.length > 0 && showCity && !error ? (
          <div className="weather-table-container">
            <div className="weather-table-title-container">
              <h2 className="table-title">
                Weather Forecast for {capitalizeFirstLetter(searchedCity)}
              </h2>
            </div>
            {loadingWeekData ? (
              <div className="loading">
                <Loading />
              </div>
            ) : (
              <table className="weather-table">
                <thead>
                  <tr>
                    <th>Days</th>
                    <th>Dates</th>
                    <th>Lowest Temp.</th>
                    <th>Highest Temp.</th>
                  </tr>
                </thead>
                <tbody>
                  {weatherDataForAWeek.map((day, index) => (
                    <tr key={index} onClick={() => handleDayClick(day)}>
                      <td>
                        {new Date(day.datetime).toLocaleDateString("en-US", {
                          weekday: "long",
                        })}
                      </td>
                      <td>
                        {new Date(day.datetime).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </td>
                      <td>{day.min_temp} °C</td>
                      <td>{day.max_temp} °C</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        ) : (
          <div
            className={
              error
                ? "invalid-page-image-container"
                : "select-city-image-container"
            }
          >
            <img src={error ? image2 : image1} alt="images" />
          </div>
        )}
        <div id="weather-details">
          <CustomSearchInput
            city={city}
            setCity={setCity}
            handleSubmit={handleSubmit}
          />
          {weatherDataForCurrentDay && showCity && !error ? (
            <div className="right-weather-details-container">
              {loadingCurrentDayData ? (
                <div className="loading">
                  <Loading />
                </div>
              ) : (
                <div className="weather-info">
                  <div className="temperature-info">
                    <h1>
                      {selectedDay
                        ? `${selectedDay.temp}°C`
                        : `${weatherDataForCurrentDay.temp}°C`}
                    </h1>
                  </div>
                  <div className="city-date-section">
                    <div className="city-info">
                      <h1>{capitalizeFirstLetter(searchedCity)}</h1>
                    </div>
                    <div className="location-date">
                      <h2>
                        {selectedDay
                          ? formatCustomDate(selectedDay.datetime)
                          : formatCustomDate(weatherDataForCurrentDay.datetime)}
                      </h2>
                    </div>
                  </div>
                  <div className="weather-condition-section">
                    <div className="condition-info">
                      {selectedDay ? (
                        <WeatherIcon iconId={selectedDay.weather.icon} />
                      ) : (
                        <WeatherIcon
                          iconId={weatherDataForCurrentDay.weather.icon}
                        />
                      )}
                    </div>
                    <div className="weather-icon-text">
                      <h3>
                        {selectedDay
                          ? selectedDay.weather.description
                          : weatherDataForCurrentDay.weather.description}
                      </h3>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div
              className={
                error
                  ? "doesNotExist-container"
                  : "right-weather-selectCity-container"
              }
            >
              <div className="info">
                <div className="title">
                  <h2>{error ? "Does not Exist" : "Select a City"}</h2>
                </div>
                <div className="description">
                  <h3>
                    {error
                      ? "Type a valid city name to get weekly forecast data."
                      : "Search and select a city to see results. Try typing the first letters of the city you want."}
                  </h3>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
