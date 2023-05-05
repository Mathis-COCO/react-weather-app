/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable arrow-parens */
/* eslint-disable indent */
import React, {useContext} from 'react';
import '../css/SearchResults.scss';
import Temp from './Temp.jsx';
import Humidity from './Humidity.jsx';
import WeatherLogos from './WeatherLogos';
import {WeatherContext} from '../providers/weather-provider';

function SearchResults() {
    const [weatherInfos, updateWeather] = useContext(WeatherContext);
    return (
        <div className='space-evenly'>
            <Temp temp={weatherInfos.main.temp} />
            <WeatherLogos></WeatherLogos>
            <Humidity humidity={weatherInfos.main.humidity} />
        </div>
    );
}

export default SearchResults;
