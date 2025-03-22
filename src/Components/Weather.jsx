import { useState } from 'react';
import axios from "axios";
import '../styles.css';

import clearskyImg from '../assets/Images/clear-sky.png';
import cloudyImg from '../assets/Images/cloudy.png';
import mistImg from '../assets/Images/mist.png';
import scatteredImg from '../assets/Images/scattered-thunderstorms.png';
import snowImg from '../assets/Images/snowflake.png';
import stormImg from '../assets/Images/storm.png';

function WeatherApp() {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);

    function addCity(evt) {
        setCity(evt.target.value);
    }

    function getWeather() {
        if (!city) return;

        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=994c74dfcd0cb652f56437cd35067a01`)
            .then((response) => {
                setWeather(response.data);
            })
            .catch((error) => {
                console.error("Error fetching weather data:", error);
            });
    }

    function getWeatherIcon(weatherMain) {
        switch (weatherMain) {
            case "Clear":
                return clearskyImg;
            case "Clouds":
                return cloudyImg;
            case "Rain":
                return stormImg;
            case "Snow":
                return snowImg;
            case "Mist":
                return mistImg;
            case "Thunderstorm":
                return scatteredImg;
            default:
                return cloudyImg;
        }
    }


    return (
        <div className="weather-app">
            <h1>🌦️ Weather App</h1>
            <input
                type="text"
                placeholder="Enter city here"
                value={city}
                onChange={addCity}
            />
            <button onClick={getWeather}>Get Weather</button>

            {weather && (
                <div className="weather-card">
                    <h2>
                        {weather.name}, {weather.sys.country}
                    </h2>
                    <p>{new Date().toLocaleDateString()}</p>
                    <img src={getWeatherIcon(weather.weather[0].main)} alt="Weather Icon" className="weather-icon" />
                    <h1>{Math.round(weather.main.temp)}°C</h1>
                    <p className="weather-description">
                        <img src={getWeatherIcon(weather.weather[0].main)} alt="Weather Icon" className="small-icon" />
                        {weather.weather[0].description}
                    </p>
                    <p>Humidity: {weather.main.humidity}%</p>
                </div>
            )}

        </div>
    );
}

export default WeatherApp;
