import React, { useEffect, useState } from "react";
import axios from "axios"; // Use axios to make the request
import WeatherCard from "./Components/WeatherCard";
import { IoSearch } from "react-icons/io5";

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("");
  const [search, setSearch] = useState(false);
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          setError(null); // Clear any previous errors
        },
        (error) => {
          setError(error.message);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  }, []);

  useEffect(() => {
    const fetchLocationWeather = async () => {
      if (location.latitude && location.longitude) {
        try {
          const response = await axios.post("http://localhost:3000/weather", {
            latitude: location.latitude,
            longitude: location.longitude,
          });
          setWeatherData(response.data); // Set the weather data in state
        } catch (e) {
          console.log("Error fetching weather by location:", e);
        }
      }
    };

    fetchLocationWeather();
  }, [location]);

  useEffect(() => {
    if (city) {
      const fetchWeather = async () => {
        try {
          const response = await axios.post("http://localhost:3000/weather", {
            city,
          });
          setWeatherData(response.data); // Set the weather data in state
        } catch (e) {
          console.log("Error fetching weather:", e);
        }
      };

      fetchWeather();
      setSearch(false);
    }
  }, [search]);

  return (
    <div className="bg-blue-700 w-screen h-screen p-10 flex flex-col items-center">
      <div className="relative">
        <input
          type="text"
          className="focus:outline-none rounded-xl w-[300px] p-2 sm:w-[400px] "
          value={city}
          onChange={handleChange}
          placeholder="Enter city"
        />
        <button
          className="text-2xl absolute right-2 top-2"
          onClick={() => {
            setSearch(true);
          }}
        >
          <IoSearch />
        </button>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {weatherData ? (
        <WeatherCard weatherData={weatherData} />
      ) : (
        <WeatherCard />
      )}
    </div>
  );
};

export default WeatherApp;
