/* eslint-disable capitalized-comments */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, {createContext, useState} from 'react';

export const WeatherContext = createContext({}); // Stocker tout le json contenant la data de meteo

const WeatherProvider = props => {
    const [weatherInfos, setWeatherInfos] = useState(false);
    const [graphInfos, setGraphInfos] = useState(false);

    function updateWeather(weather) {
        // localStorage.setItem('weather', 'AAAAAAAAAAAAAA');
        // console.log(localStorage.getItem('weather'));
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
    ];

    return (
        <WeatherContext.Provider value={contextValues}>
            {props.children}
        </ WeatherContext.Provider>
    );
};

export default WeatherProvider;
