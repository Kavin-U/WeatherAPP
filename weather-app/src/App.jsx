import React, { useEffect, useState } from "react";
import axios from "axios";  // Use axios to make the request
import WeatherCard from "./Components/WeatherCard";

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("");
  const [search, setSearch] = useState(false);

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  useEffect(() => {
    if (city) {
      const fetchWeather = async () => {
        try {
          const response = await axios.post("http://localhost:3000/weather", { city });
          setWeatherData(response.data); // Set the weather data in state
          console.log(response.data)
        } catch (e) {
          console.log("Error fetching weather:", e);
        }
      };

      fetchWeather();
      setSearch(false); 
    }
  }, [search]);  // Trigger fetch whenever city changes

  return (
    <div>
      <h1>Weather App</h1>
      <input type="text" value={city} onChange={handleChange} placeholder="Enter city" />
      <button onClick={()=>{setSearch(true)}}>Search</button>
      {weatherData ? (
        <WeatherCard weatherData={weatherData} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default WeatherApp;
