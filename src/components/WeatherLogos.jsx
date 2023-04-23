/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable arrow-parens */
/* eslint-disable indent */
import React from 'react';
import '../css/WeatherLogos.scss';

function WeatherLogos(props) {
    const weatherType = props.weatherType.weather[0].main;
    console.log(weatherType);
    let weatherImg = null;
    switch (weatherType) {
        case 'Clear':
            weatherImg = 'Clear';
        break;
        case 'Rain':
            weatherImg = 'SunnyRain';
        break;
        case 'Clouds':
            weatherImg = 'Clouds';
        break;
        case 'Atmosphere':
            weatherImg = 'Mist';
        break;
        case 'Snow':
            weatherImg = 'Snow';
        break;
        case 'Drizzle':
            weatherImg = 'CloudyRain';
        break;
        case 'Thunderstorm':
            weatherImg = 'Thunder';
        break;
        default:
            break;
    }

    return (
        <div>
            <div className='navbar-c-logo'>
                <img src='../img/weather-logos/{weatherImg}.png' alt='weather-logo' className='navbar-logo' />
            </div>
        </div>
  );
}

export default WeatherLogos;
