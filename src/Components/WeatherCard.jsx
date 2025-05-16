import React, { useState, useEffect } from "react";
import WeatherImgs from "./WeatherImgs";
import clearsky from "../assets/weather/Clear_sky.jpg";
import clear from "../assets/weather_icons/clear-sky.png";
import Sunrise from "../assets/weather_icons/sunrise.png";
import Sunset from "../assets/weather_icons/sunset-.png";
import weathericn from "./WeatherIcs";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const WeatherCard = ({ weatherData }) => {
  const [bgImage, setBgImage] = useState(null);
  const [loading, setLoading] = useState(true);

  const data = weatherData || null;

  useEffect(() => {
    if (data && data.weather && data.weather.description) {
      const description = data.weather.description.toLowerCase();
      const imageUrl = WeatherImgs[description] || clearsky;

      const img = new Image();
      img.src = imageUrl;
      img.onload = () => {
        setBgImage(imageUrl);
        setLoading(false);
      };
    } else {
      setLoading(true);
    }
  }, [data]);

  const style = {
    backgroundImage: bgImage ? `url(${bgImage})` : "none",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    transition: "background-image 0.5s ease-in-out",
  };

  if (loading) {
    return (
      <SkeletonTheme baseColor="#a4f2fc" highlightColor="white">
        <div className="w-[90%] h-[90%] p-4 mt-3 overflow-hidden rounded-lg bg-white bg-opacity-30">
          <Skeleton height={250} />
          <div className="block md:flex justify-evenly my-4 gap-20">
            <div className="text-center w-full md:w-[30%]">
              <Skeleton height={30} width={"100%"} />
              <Skeleton width={"60%"} />
            </div>
            <div className="text-center w-full md:w-[30%]">
              <Skeleton height={30} width={"100%"} />
              <Skeleton width={"60%"} />
            </div>
            <div className="text-center w-full md:w-[30%]">
              <Skeleton height={30} width={"100%"} />
              <Skeleton width={"60%"} />
            </div>
          </div>
          <Skeleton height={200} />
        </div>
      </SkeletonTheme>
    );
  }

  return (
    <div
      style={style}
      id="weather-main"
      className="w-[90%] h-[90%] p-2 flex flex-col gap-4 justify-between mt-3 overflow-hidden rounded-lg bg-white bg-opacity-30 sm:bg-opacity-60"
    >
      <div className="w-full h-[250px] rounded-md bg-white bg-opacity-35 p-5 sm:p-7 sm:flex block justify-between">
        <div>
          <h3 className="text-xl sm:text-2xl">
            {data.city_name}, {data.country_code}
          </h3>
          <h1 className="sm:text-6xl text-4xl mt-3">{data.temp}°C</h1>
          <p className="text-xl mt-3 capitalize">{data.weather.description}</p>
        </div>

        <div className="hidden sm:hidden lg:flex justify-evenly w-[600px] h-fit p-4 text-black rounded-lg bg-gray-500 bg-opacity-35">
          <div className="flex flex-col gap-3">
            <p>
              <span className="font-semibold">Lattitude</span> <br />
              {data.lat}
            </p>
            <p>
              <span className="font-semibold">Longitude</span> <br />
              {data.lon}
            </p>
          </div>
          <div>
            <img
              className="w-[50px] h-[50px] mb-3"
              src={Sunrise}
              alt="Sunrise"
            />
            <p>
              <span className="font-semibold">Sunrise</span> <br />
              {data.sunrise}
            </p>
          </div>
          <div>
            <img className="w-[50px] h-[50px] mb-3" src={Sunset} alt="Sunset" />
            <p>
              <span className="font-semibold">Sunset</span> <br />
              {data.sunset}
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <p>
              <span className="font-semibold">TimeZone</span> <br />
              {data.timezone}
            </p>
            <p>
              <span className="font-semibold">Wind Direction</span> <br />
              {data.wind_cdir_full}
            </p>
          </div>
        </div>

        <div className="min-w-[130px] relative">
          <div className="text-sm absolute bottom-3 right-2 sm:static sm:float-right">
            {data.ob_time}
          </div>
          <div>
            <img
              className="w-[70px] h-[70px] float-none sm:float-right mt-4 sm:w-[100px] sm:h-[100px]"
              src={weathericn[data.weather.description.toLowerCase()] || clear}
              alt="weather icon"
            />
          </div>
        </div>
      </div>

      <div className="block overflow-auto sm:overflow-hidden sm:flex lg:hidden sm:justify-evenly w-full gap-10 mx-auto h-fit p-4 text-black rounded-lg bg-gray-500 bg-opacity-35 scrollbar-thin">
        <div className="block mb-2 sm:flex sm:mb-0 flex-col gap-3">
          <p>
            <span className="font-semibold">Lattitude</span> <br />
            {data.lat}
          </p>
          <p>
            <span className="font-semibold">Longitude</span> <br />
            {data.lon}
          </p>
        </div>
        <div className="flex gap-4 justify-evenly">
          <div>
            <img
              className="w-[50px] h-[50px] mb-3"
              src={Sunrise}
              alt="Sunrise"
            />
            <p>
              <span className="font-semibold">Sunrise</span> <br />
              {data.sunrise}
            </p>
          </div>
          <div>
            <img className="w-[50px] h-[50px] mb-3" src={Sunset} alt="Sunset" />
            <p>
              <span className="font-semibold">Sunset</span> <br />
              {data.sunset}
            </p>
          </div>
        </div>
        <div className="block sm:flex flex-col gap-3">
          <p>
            <span className="font-semibold">TimeZone</span> <br />
            {data.timezone}
          </p>
          <p>
            <span className="font-semibold">Wind Direction</span> <br />
            {data.wind_cdir_full}
          </p>
        </div>
      </div>

      <div className="w-full flex justify-evenly rounded-md items-center bg-opacity-35 h-[100px] bg-white">
        <div className="text-center">
          <p className="text-lg">{data.app_temp}°C</p>
          <span className="text-sm">Feels like</span>
        </div>
        <div className="text-center">
          <p className="text-lg">{data.rh}%</p>
          <span className="text-sm">Humidity</span>
        </div>
        <div className="text-center">
          <p className="text-lg">{data.wind_spd} MPH</p>
          <span className="text-sm">Wind Speed</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
