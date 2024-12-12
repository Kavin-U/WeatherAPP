import React from "react";
import Box from "@mui/material/Box";

const WeatherCard = ({ weatherData }) => {
  if (!weatherData || weatherData.length === 0) return <p>No data available</p>;

  const data = weatherData[0]; // Since the API response contains the data in an array
  console.log(data);
  return (
    <div>
      <Box
        component="section"
        sx={{
          width: 400,
          height: 600,
          borderRadius: 1,
          bgcolor: "primary.main",
          "&:hover": {
            bgcolor: "primary.dark",
          },
        }}
      >
        <h2>Weather in {data.city_name}</h2>
        <p>
          <strong>Country:</strong> {data.country_code}
        </p>
        <p>
          <strong>Temperature:</strong> {data.temp}°C
        </p>
        <p>
          <strong>Apparent Temperature:</strong> {data.app_temp}°C
        </p>
        <p>
          <strong>Air Quality Index (AQI):</strong> {data.aqi}
        </p>
        <p>
          <strong>Humidity:</strong> {data.rh}%
        </p>
        <p>
          <strong>Pressure:</strong> {data.pres} hPa
        </p>
        <p>
          <strong>Wind:</strong> {data.wind_cdir_full} ({data.wind_cdir}) at{" "}
          {data.wind_spd} m/s
        </p>
        <p>
          <strong>Visibility:</strong> {data.vis} km
        </p>
        <p>
          <strong>Sunrise:</strong> {data.sunrise}
        </p>
        <p>
          <strong>Sunset:</strong> {data.sunset}
        </p>
        <p>
          <strong>UV Index:</strong> {data.uv}
        </p>
        <p>
          <strong>Weather Description:</strong> {data.weather.description}
        </p>
      </Box>
    </div>
  );
};

export default WeatherCard;
