import React, { useEffect, useState } from "react";
import axios from "axios";
import WeatherCard from "./Components/WeatherCard";
import { IoSearch } from "react-icons/io5";

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("");
  const [search, setSearch] = useState(false);
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [error, setError] = useState(null);
  const [online, setOnline] = useState(false);

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  const BASE_URL = "https://api.weatherbit.io/v2.0/current";

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  useEffect(() => {
    if (navigator.onLine) {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude });
            setError(null);
            setOnline(false);
          },
          (error) => {
            setError("Geolocation permission denied or unavailable.");
          }
        );
      } else {
        setError("Geolocation is not supported by your browser.");
      }
    } else {
      setOnline(true);
    }
  }, []);

  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          lat,
          lon,
          key: API_KEY,
        },
      });
      setWeatherData(response.data.data[0]);
    } catch (err) {
      console.error("Error fetching weather by location:", err);
      setError("Failed to fetch weather using your location.");
    }
  };

  const fetchWeatherByCity = async (cityName) => {
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          city: cityName,
          key: API_KEY,
        },
      });
      setWeatherData(response.data.data[0]);
      console.log(response.data.data[0]);
      
    } catch (err) {
      console.error("Error fetching weather by city:", err);
      setError("Failed to fetch weather for the specified city.");
    }
  };

  useEffect(() => {
    if (location.latitude && location.longitude) {
      fetchWeatherByCoords(location.latitude, location.longitude);
    }
  }, [location]);

  useEffect(() => {
    if (search && city) {
      fetchWeatherByCity(city);
      setSearch(false);
    } else if (search && !city) {
      setError("Please enter a valid city name.");
      setSearch(false);
    }
  }, [search]);

  return (
    <div className="bg-gray-900 w-screen h-screen p-10 flex flex-col items-center">
      {online && <div className="text-center p-2 text-red-700">You're Offline</div>}
      <div className="relative">
        <input
          type="text"
          className="focus:outline-none rounded-xl w-[300px] p-2 sm:w-[400px]"
          value={city}
          onChange={handleChange}
          placeholder="Enter city"
        />
        <button
          className="text-2xl absolute right-2 top-2"
          onClick={() => setSearch(true)}
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
