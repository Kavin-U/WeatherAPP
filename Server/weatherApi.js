import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";
import path from 'path';

dotenv.config();

const app = express();
const PORT = 3000;

// const _dirname = path.resolve();

// Middleware
app.use(express.json());
app.use(cors());

// Weather API Details
const API_KEY = process.env.Weatherkey;
const BASE_URL = "https://api.weatherbit.io/v2.0/current";

// Weather Endpoint
app.post("/weather", async (req, res) => {
  const { city, latitude, longitude } = req.body;

  try {
    let response;

    if (city) {
      // Fetch weather data by city
      response = await axios.get(`${BASE_URL}`, {
        params: {
          city,
          key: API_KEY,
        },
      });
    } else if (latitude && longitude) {
      // Fetch weather data by latitude and longitude
      response = await axios.get(`${BASE_URL}`, {
        params: {
          lat: latitude,
          lon: longitude,
          key: API_KEY,
        },
      });
    } else {
      return res.status(400).json({ error: "City or coordinates are required." });
    }

    // Respond with weather data
    res.json(response.data.data);
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
    res.status(500).json({
      error: error.response ? error.response.data : "Internal server error.",
    });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});

// app.use(express.static(path.join(_dirname, '/weather-app/dist')));

// app.get('*',(req,res)=>{
//   res.sendFile(path.join(_dirname, 'weather-app', 'dist', 'index.html'));
// })