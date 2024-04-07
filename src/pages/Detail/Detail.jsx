import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Lottie from "lottie-react"; // Lottie kütüphanesini import edin
import Thermometer from "../../assets/icons/thermal.png";
import RainProbability from "../../assets/icons/rain-probability.png";
import WindSpeed from "../../assets/icons/wind-speed.png";
import AirHumidity from "../../assets/icons/air-humidity.png";
import CloudCover from "../../assets/icons/cloud-cover.png";

import "./Detail.css";

import axios from "axios";

import loadingAnimation from "../../assets/loading.json";

function WeatherDetail() {
  const [Weather, setWeather] = useState([]);
  const [loading, setLoading] = useState(true);
  const { city } = useParams();
  const options = { weekday: "short", month: "short", day: "numeric" };

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const apiKey = "2fcf02fde17e7660184946ac72ac7813";
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
        const response = await axios.get(url);
        const allWeathers = response.data.list;
        const fiveDayWeather = [];
        for (let i = 0; i < 40; i += 8) {
          fiveDayWeather.push(allWeathers[i]);
        }
        setWeather(fiveDayWeather);

        setTimeout(() => {
          setLoading(false);
        }, 2000);
      } catch (error) {
        console.error("Error fetching Weather data:", error);
      }
    };

    fetchWeather();
  }, [city]);

  if (loading) {
    return (
      <div className="section-loading">
        <Lottie className="loading-gif" animationData={loadingAnimation} />
      </div>
    );
  }

  if (Weather.length === 0) {
    return <div>No Weather data available.</div>;
  }

  return (
    <div className="section-detail">
      <h2 className="title">iWeather {city}</h2>
      <div className="weather-container">
        {Weather.map((item, index) => (
          <div key={index} className="weather-item">
            <p>{new Date(item.dt * 1000).toLocaleString("en-US", options)}</p>
            <p>
              <img src={Thermometer} alt="Thermometer" />
              Thermal Sensation: <span> {item.main.temp}°C</span>
            </p>
            <p>
              <img src={CloudCover} alt="CloudCover" /> Cloud Cover:{" "}
              <span>{item.clouds.all}%</span>
            </p>
            <p>
              <img src={RainProbability} alt="RainProbability" />
              Rain Probability:{" "}
              <span>
                {item.rain && item.rain["3h"]
                  ? `${((item.rain["3h"] / 3) * 100).toFixed(1)}%`
                  : "0%"}
              </span>
            </p>
            <p>
              <img src={AirHumidity} alt="AirHumidity" />
              Air Humidity: <span> {item.main.humidity}%</span>
            </p>
            <p>
              <img src={WindSpeed} alt="WindSpeed" /> Wind Speed:{" "}
              <span> {item.wind.speed} m/s</span>
            </p>
            <p>Condition: {item.weather[0].description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeatherDetail;
