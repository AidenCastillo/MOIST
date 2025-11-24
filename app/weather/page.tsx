"use client";
import styles from './Weatherpage.module.css';
import React from 'react';

// Randomized weather cards for demo purposes
// In a real application, this would fetch actual weather data from an API
import { useEffect } from 'react';


function WeatherCards() {
    // Placeholder for weather cards
    useEffect(() => {
        const demoWeather = [
            { id: 1, condition: 'Sunny', temperature: 30, humidity: 40 },
            { id: 2, condition: 'Cloudy', temperature: 25, humidity: 60 },
        ];
    }, []);
    return (
        <div className={styles.weatherForecast}>
            <h2>Weather Forecast</h2>
            <p>Current weather data will be displayed here.</p>
            {/* columns for each day */}
            {/* image to right */}
            <div className={styles.weatherCards} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                {Array.from({ length: 7 }).map((_, index) => (
                    <div key={index} className={styles.weatherCard}>
                        <h3>Day {index + 1}</h3>
                        <p>Condition: {['Sunny', 'Cloudy', 'Rainy'][index % 3]}</p>
                        <p>Temperature: {20 + index * 2}°C</p>
                        <img src={`/weather-icon-${index % 3}.png`} alt="Weather Icon" width={50} height={50} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default function WeatherPage() {
    return (
        <div className={styles.weatherPage}>
            <h1>Weather Information</h1>
            <p>Current weather data will be displayed here.</p>
            <WeatherCards />
        </div>
    )
}
