import React, { useState } from "react";
import axios from "axios";

function Weather() {

    // React States
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // API Key
    const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

    // Check API Key
    console.log("API Key loaded:", !!API_KEY);
    console.log("API Key length:", API_KEY?.length);

    // Search Weather Function
    const searchWeather = async (e) => {

        e.preventDefault();

        // Validate input
        if (!city.trim()) {
            setError("Please enter a city name!");
            setWeather(null);
            return;
        }

        // Check API Key
        if (!API_KEY) {
            setError("API key not loaded. Please check your .env file.");
            return;
        }

        setLoading(true);
        setError("");
        setWeather(null);

        try {

            // Dynamic API URL
            const API_URL =
                `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city.trim())}&appid=${API_KEY}&units=metric`;

            // Axios GET Request
            const response = await axios.get(API_URL);

            // Store weather data
            setWeather(response.data);

            console.log("Weather Data:", response.data);

        } catch (err) {

            console.error("Weather API Error:", err.response?.data || err.message);

            if (err.response?.status === 404) {

                setError("City not found! Please enter a valid city.");

            } else if (err.response?.status === 401) {

                setError("Invalid API key. Check your OpenWeatherMap API key.");

            } else {

                setError("Unable to fetch weather. Please try again.");

            }

        } finally {

            setLoading(false);

        }

    };

    return (

        <main className="weather-container">

            {/* Application Heading */}

            <h1>🌦️ Weather Report</h1>

            <p className="subtitle">
                Check real-time weather conditions around the world
            </p>


            {/* Search Form */}

            <form onSubmit={searchWeather} className="search-box">

                <input
                    type="text"
                    placeholder="Enter city name..."
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />

                <button type="submit" disabled={loading}>

                    {loading ? "Searching..." : "Search"}

                </button>

            </form>


            {/* Error Message */}

            {error && (

                <p className="error">
                    {error}
                </p>

            )}


            {/* Loading Message */}

            {loading && (

                <p className="loading">
                    Fetching weather data...
                </p>

            )}


            {/* Weather Information */}

            {weather && (

                <section className="weather-card">

                    <h2>
                        📍 {weather.name}, {weather.sys.country}
                    </h2>


                    {/* Weather Icon */}

                    <img
                        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                        alt={weather.weather[0].description}
                    />


                    {/* Temperature */}

                    <h1>
                        {Math.round(weather.main.temp)}°C
                    </h1>

                    <h3>
                        {weather.weather[0].description}
                    </h3>


                    {/* Weather Details */}

                    <div className="weather-details">


                        {/* Feels Like */}

                        <div className="detail">

                            <h4>🌡️ Feels Like</h4>

                            <p>
                                {Math.round(weather.main.feels_like)}°C
                            </p>

                        </div>


                        {/* Humidity */}

                        <div className="detail">

                            <h4>💧 Humidity</h4>

                            <p>
                                {weather.main.humidity}%
                            </p>

                        </div>


                        {/* Wind Speed */}

                        <div className="detail">

                            <h4>💨 Wind Speed</h4>

                            <p>
                                {weather.wind.speed} m/s
                            </p>

                        </div>


                        {/* Pressure */}

                        <div className="detail">

                            <h4>🌡️ Pressure</h4>

                            <p>
                                {weather.main.pressure} hPa
                            </p>

                        </div>

                    </div>

                </section>

            )}

        </main>

    );

}

export default Weather;