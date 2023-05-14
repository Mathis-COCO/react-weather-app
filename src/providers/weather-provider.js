/* eslint-disable new-cap */
/* eslint-disable camelcase */

/* eslint-disable react/prop-types */

/* eslint-disable indent */
import React, {createContext, useEffect, useState} from 'react';

export const WeatherContext = createContext({}); // Stocker tout le json contenant la data de meteo

const WeatherProvider = props => {
    const APIKey = process.env.REACT_APP_WEATHER_NAV_API_KEY;
    let foreWeather = null;
    const [weatherInfos, setWeatherInfos] = useState(false);
    const [graphInfos, setGraphInfos] = useState(false);
    const [location, setLocation] = useState('Sainte-Anne');
    const [isLoading, setIsLoading] = useState(true);

    function GetInfos(city) {
        if (city) {
            setLocation(city);
        }

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}
        &units=metric&appid=${APIKey}`).then(response => response.json()).then(weather => {
            if (weather.cod === '404') {
                console.log('Erreur 404.');
            }

            fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${weather.coord.lat}&lon=${weather.coord.lon}&units=metric&appid=${APIKey}`).then(response => response.json()).then(forecastWeather => {
                foreWeather = forecastWeather;
                updateGraph(foreWeather);
                updateWeather(weather);
                setIsLoading(false);
            });
        });
    }

    function updateWeather(weather) {
        setWeatherInfos(weather);
    }

    function updateGraph(futureWeather) {
            setGraphInfos(futureWeather);
    }

    const contextValues = [
        weatherInfos,
        updateWeather,
        graphInfos,
        updateGraph,
        location,
        setLocation,
    ];

    useEffect(() => {
        GetInfos();
    }, [location]);

    if (isLoading) {
        return <div>Chargement en cours...</div>;
      }

    return (
        <WeatherContext.Provider value={contextValues}>
            {props.children}
        </ WeatherContext.Provider>
    );
};

export default WeatherProvider;
