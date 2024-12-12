import React from "react";

const WeatherCard = ({ weatherData }) => {
  if (!weatherData || weatherData.length === 0) return <p>No data available</p>;

  const data = weatherData[0]; // Since the API response contains the data in an array
  console.log(data);
  return (
    <div className="w-[90%] h-[90%] p-2 flex flex-col justify-between mt-3 rounded-lg bg-white bg-opacity-30">
      <div className="w-full h-[250px] rounded-md bg-white bg-opacity-65 p-5 sm:flex flex-col justify-center">
        <h3 className="text-2xl">{data.city_name},{data.country_code}</h3>
        <h1 className="text-5xl">{data.temp}°F</h1>
      </div>
      <div className="w-full flex justify-evenly rounded-md items-center bg-opacity-65 h-[100px] bg-white">
        <div className="text-center">
          <p>{data.app_temp}°F</p>
          Feels like
        </div>
        <div className="text-center">
          <p>{data.rh}%</p>
          Humidity
        </div>
        <div className="text-center">
          <p>{data.wind_cdir_full} MPH</p>
          Wind Speed
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;

// <p>
// <strong>Country:</strong> {data.country_code}
// </p>
// <p>
// <strong>Temperature:</strong> {data.temp}°C
// </p>
// <p>
// <strong>Apparent Temperature:</strong> {data.app_temp}°C
// </p>
// <p>
// <strong>Air Quality Index (AQI):</strong> {data.aqi}
// </p>
// <p>
// <strong>Humidity:</strong> {data.rh}%
// </p>
// <p>
// <strong>Pressure:</strong> {data.pres} hPa
// </p>
// <p>
// <strong>Wind:</strong> {data.wind_cdir_full} ({data.wind_cdir}) at{" "}
// {data.wind_spd} m/s
// </p>
// <p>
// <strong>Visibility:</strong> {data.vis} km
// </p>
// <p>
// <strong>Sunrise:</strong> {data.sunrise}
// </p>
// <p>
// <strong>Sunset:</strong> {data.sunset}
// </p>
// <p>
// <strong>UV Index:</strong> {data.uv}
// </p>
// <p>
// <strong>Weather Description:</strong> {data.weather.description}
// </p>
