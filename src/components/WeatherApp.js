import React, { useState } from "react";
import axios from "axios";
import './Weather.css';

const WeatherApp = () => {
  const api = {
    key: "464e3842708bee6b0d4e7b69f596392a",
    base: "https://api.openweathermap.org/data/2.5/",
  };

  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  //Fetchig the weather data from the api on the basis of the city name
  const search = (evt) => {
    if (evt.key === "Enter") {
      axios
        .get(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
        .then((response) => {
          const actualData = response.data;
          setWeather(actualData);
          setQuery("");
          console.log(actualData);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    //Checking whether if weather data is available and if the temp is less than 16 degree or not to set the classname
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp < 16
            ? "app cold"
            : "app"
          : "app"
      }
    >
      
      <main>
        <div className="searchSection">
        <h1>Type and Check the Weather of your city</h1>
        <div className="search-box">
        {/* Searching the city name and fetching the data basis of the city name */}
          <input
            type="text"
            className="search-bar"
            placeholder="Search City"
            onChange={(event) => {
              setQuery(event.target.value);
            }}
            value={query}
            onKeyPress={search}
          />
        </div>
        </div>
        {/* Displaying the city name, temperature and type of weather if the data is fetched successfully */}
        {typeof weather.main != "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{weather.main.temp}°C</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
};

export default WeatherApp;
