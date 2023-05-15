/* eslint-disable new-cap */
/* eslint-disable camelcase */

/* eslint-disable react/prop-types */

/* eslint-disable indent */
import React, {createContext, useEffect, useState} from 'react';
import '../css/App.scss';
import pageLoader from '../img/loader1.gif';

export const WeatherContext = createContext({}); // Stocker tout le json contenant la data de meteo

const params = new URLSearchParams(window.location.search);
const cityParam = params.get('city');

const WeatherProvider = props => {
    const APIKey = process.env.REACT_APP_WEATHER_NAV_API_KEY;
    let foreWeather = null;
    const [weatherInfos, setWeatherInfos] = useState(false);
    const [graphInfos, setGraphInfos] = useState(false);
    const [location, setLocation] = useState('Sainte Anne Guadeloupe');
    const [isLoading, setIsLoading] = useState(true);
    const API_URL = `https://nominatim.openstreetmap.org/search?q=${location}&format=json&limit=1`;

    function GetInfos() {
        console.log(cityParam);
        if (cityParam) {
            setLocation(cityParam);
        }

        if (cityParam === null) {
            setLocation('Sainte-Anne Guadeloupe');
        }

        fetch(API_URL)
        .then(response => response.json())
        .then(data =>
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${data[0].lat}&lon=${data[0].lon}&units=metric&appid=${APIKey}`).then(response => response.json()).then(weather => {
                if (weather.cod === '404') {
                    console.log('Erreur 404.');
                }

                fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${weather.coord.lat}&lon=${weather.coord.lon}&units=metric&appid=${APIKey}`).then(response => response.json()).then(forecastWeather => {
                    foreWeather = forecastWeather;
                    updateGraph(foreWeather);
                    updateWeather(weather);
                    setTimeout(() => {
                        setIsLoading(false);
                    }, 500);
                });
            }),
        )
        .catch(error => console.error(error));
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
    }, [location, cityParam]);

    if (isLoading) {
        return <div className='page-loader'><div><img src={pageLoader} className='page-loader-gif' alt='chargement en cours...'></img><p className='loading-txt'>chargement en cours</p> </div></div>;
      }

    return (
        <WeatherContext.Provider value={contextValues}>
            {props.children}
        </ WeatherContext.Provider>
    );
};

export default WeatherProvider;
