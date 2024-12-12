import express from "express";
import cors from "cors";
import axios from "axios";  // You need to use axios to make the request

const app = express();
app.use(express.json());
app.use(cors());
const PORT = 3000;

const API_KEY = "2e9c187e14f643eaa4a33aa0a4d390ad";
const BASE_URL = "https://api.weatherbit.io/v2.0/current";

app.post("/weather", async (req, res) => {
  const { city } = req.body; // Assuming you're passing the city in the request body
  console.log(city);
  try {
    const response = await axios.get(`${BASE_URL}?city=${city}&key=${API_KEY}&units=I`);
    console.log("Weather Data:", response.data);
    res.json(response.data.data); // Sending back the weather data
  } catch (e) {
    console.error("Error fetching weather data:", e.response ? e.response.data : e.message);
    res.status(500).json({ error: "Error fetching weather data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
