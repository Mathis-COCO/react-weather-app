/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable arrow-parens */
/* eslint-disable indent */
import React, {useContext} from 'react';
import '../css/SearchResults.scss';
import WeatherLogos from './WeatherLogos';
import {WeatherContext} from '../providers/weather-provider';

function SearchResults(props) {
    const showBar = props;
    const [weatherInfos, updateWeather] = useContext(WeatherContext);
    return (
        <div className='space-evenly'>
            <div>
                <p className='p-temperature'>{weatherInfos.main.temp + '°C'}</p>
            </div>
            <div>
                <p className='p-humidity'>{weatherInfos.main.humidity + '%'}</p>
            </div>
        </div>
    );
}

export default SearchResults;
