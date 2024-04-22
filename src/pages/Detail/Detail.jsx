import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import Thermometer from "../../assets/icons/thermal.png";
import RainProbability from "../../assets/icons/rain-probability.png";
import WindSpeed from "../../assets/icons/wind-speed.png";
import AirHumidity from "../../assets/icons/air-humidity.png";
import CloudCover from "../../assets/icons/cloud-cover.png";
import ReturnBtn from "../../assets/images/return-btn.png";

import "./Detail.css";

import axios from "axios";

import loadingAnimation from "../../assets/loading.json";

function WeatherDetail() {
  const { city } = useParams();
  const [weather, setWeather] = useState([]);
  const [loading, setLoading] = useState(true);
  const [countryCode, setCountryCode] = useState([]);
  const navigate = useNavigate();

  const options = { weekday: "short", month: "short", day: "numeric" };

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const apiKey = "2fcf02fde17e7660184946ac72ac7813";
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
        const response = await axios.get(url);
        const allWeathers = response.data.list;
        const countryCode = response.data.city.country;
        const fiveDayWeather = [];
        for (let i = 0; i < 40; i += 8) {
          fiveDayWeather.push(allWeathers[i]);
        }
        setWeather(fiveDayWeather);
        setCountryCode(countryCode);

        setTimeout(() => {
          setLoading(false);
        }, 2000);
      } catch (error) {
        console.error("Error fetching Weather data:", error);
        navigate("/error");
      }
    };

    fetchWeather();
  }, [city]);

  if (loading) {
    return (
      <div className="loading-section">
        <Lottie className="loading-gif" animationData={loadingAnimation} />
      </div>
    );
  }

  if (weather.length === 0) {
    return <div>No Weather data available.</div>;
  }

  return (
    <div className="weather-detail-section">
      <div className="weather-container">
        <button className="return-btn" onClick={() => navigate(-1)}>
          <img className="return-img" src={ReturnBtn} alt="" />
        </button>
        <div>
          {weather.slice(0, 1).map((item, index) => (
            <div key={index}>
              <div className="weather-wrapper">
                <div className="top-side">
                  <div className="weather-title">
                    {city.charAt(0).toUpperCase() + city.slice(1)},{" "}
                    {countryCode}
                    <p>
                      {new Date(item.dt * 1000).toLocaleString(
                        "en-US",
                        options
                      )}
                    </p>
                  </div>
                  <div className="weather-info">
                    <div>
                      <span> {item.main.temp}°c</span>
                      <p>
                        {item.weather[0].description.charAt(0).toUpperCase() +
                          item.weather[0].description.slice(1)}
                      </p>
                    </div>
                    <img
                      className="weather-icon2"
                      src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div className="weather-detail">
                <div className="weather-items">
                  <p>
                    <img
                      className="weather-icon"
                      src={Thermometer}
                      alt="Thermometer"
                    />
                    Thermal Sensation:{" "}
                  </p>
                  <span> {item.main.temp}°C</span>
                </div>
                <div className="weather-items">
                  <p>
                    <img
                      className="weather-icon"
                      src={CloudCover}
                      alt="CloudCover"
                    />{" "}
                    Cloud Cover:{" "}
                  </p>
                  <span>{item.clouds.all}%</span>
                </div>
                <div className="weather-items">
                  <p>
                    <img
                      className="weather-icon"
                      src={RainProbability}
                      alt="RainProbability"
                    />
                    Rain Probability:
                  </p>
                  <span>
                    {item.rain && item.rain["3h"]
                      ? `${((item.rain["3h"] / 3) * 100).toFixed(1)}%`
                      : "0%"}
                  </span>
                </div>
                <div className="weather-items">
                  <p>
                    <img
                      className="weather-icon"
                      src={AirHumidity}
                      alt="AirHumidity"
                    />
                    Air Humidity:{" "}
                  </p>
                  <span> {item.main.humidity}%</span>
                </div>
                <div className="weather-items">
                  <p>
                    <img
                      className="weather-icon"
                      src={WindSpeed}
                      alt="WindSpeed"
                    />{" "}
                    Wind Speed:
                  </p>{" "}
                  <span> {item.wind.speed} m/s</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Five days temperature and icons */}
        <div className="weather-weekly-section">
          <div className="next-5-days">
            {weather.map((item, index) => (
              <div className="weather-days-items" key={index}>
                <p className="weather-day">
                  {new Date(item.dt * 1000).toLocaleDateString("en-US", {
                    weekday: "short",
                  })}
                </p>
                <img
                  className="weather-icon2"
                  src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                  alt=""
                />
                <p className="weather-temp">{item.main.temp}°C</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherDetail;
