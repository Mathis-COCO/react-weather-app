/* eslint-disable quotes */
/* eslint-disable capitalized-comments */
/* eslint-disable new-cap */
/* eslint-disable camelcase */

/* eslint-disable react/prop-types */

/* eslint-disable indent */
import React, {createContext, useEffect, useState} from 'react';
import '../css/App.scss';
import pageLoader from '../img/loader1.gif';
import error404 from '../img/error_404.png';

export const WeatherContext = createContext({}); // Stocker tout le json contenant la data de meteo

const WeatherProvider = props => {
    const APIKey = process.env.REACT_APP_WEATHER_NAV_API_KEY;
    let foreWeather = null;
    const [weatherInfos, setWeatherInfos] = useState({coord: {lat: 54.2, lon: 41.2}});
    const [graphInfos, setGraphInfos] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const params = new URLSearchParams(window.location.search);
    const [location, setLocation] = useState(params.get('city') ? params.get('city') : 'Sainte-Anne-Guadeloupe');
    const API_URL = `https://nominatim.openstreetmap.org/search?q=${location}&format=json&limit=1`;

    function GetInfos() {
        window.history.pushState(null, null, `?city=${location}`);
        fetch(API_URL).then(response => {
            if (!response.ok) {
                setIsLoading(false);
                setIsError(true);
            }

            return response.json();
            }).then(data => {
            if (!data[0]) {
                setIsError(true);
            }

            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${data[0].lat}&lon=${data[0].lon}&units=metric&appid=${APIKey}`).then(response => response.json()).then(weather => {
                fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${weather.coord.lat}&lon=${weather.coord.lon}&units=metric&appid=${APIKey}`).then(response => response.json()).then(forecastWeather => {
                    foreWeather = forecastWeather;
                    updateGraph(foreWeather);
                    updateWeather(weather);
                    setTimeout(() => {
                        setIsLoading(false);
                    }, 500);
                });
            })
            .catch(error => console.error(error));
        });
    }

    function updateWeather(weather) {
        setWeatherInfos(weather);
    }

    function updateGraph(futureWeather) {
        setGraphInfos(futureWeather);
    }

    function backToHome() {
        window.history.pushState(null, null, `?city=Sainte-Anne Guadeloupe`);
        window.location.reload();
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

    if (isError) {
        return (
            <div className='page-loader' onClick={backToHome}>
                <div>
                    <img src={error404} className='error-page-png' alt='Erreur !'></img>
                    <p className='error-txt'>{`la page n'existe pas`}</p>
                    <p className='error-txt-2'>{`revenir au site`}</p>
                </div>
            </div>
        );
    }

    if (isLoading && !isError) {
        return (
            <div className='page-loader'>
                <div>
                    <img src={pageLoader} className='page-loader-gif' alt='Chargement en cours'></img>
                    <p className='loading-txt'>chargement en cours</p>
                </div>
            </div>
        );
    }

    return (
        <WeatherContext.Provider value={contextValues}>
            {props.children}
        </ WeatherContext.Provider>
    );
};

export default WeatherProvider;
