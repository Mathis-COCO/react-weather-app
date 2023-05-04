/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, {createContext, useState} from 'react';

export const WeatherContext = createContext([{weather: [{main: 'Clear', icon: '04n'}], main: {temp: 25}}]); // Stocker tout le json

const WeatherProvider = props => {
    const [weatherInfos, setWeatherInfos] = useState(false);

    return (
        <WeatherContext.Provider value={[weatherInfos, setWeatherInfos]}>
            {props.children}
        </ WeatherContext.Provider>
    );
};

export default WeatherProvider;
