/* eslint-disable capitalized-comments */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable arrow-parens */
/* eslint-disable indent */
import React, {useContext, useEffect, useState} from 'react';
import '../css/WeatherBar.scss';
import {WeatherContext} from '../providers/weather-provider';
import WeatherLogos from './WeatherLogos';

function WeatherBar() {
    const [weatherInfos, updateWeather] = useContext(WeatherContext);
    const [background, setBackground] = useState('rgb(79, 173, 255)');
    // console.log(weatherInfos.weather[0].main);
    const styles = {
        weatherbar: {
            backgroundColor: {background},
        },
    };

    useEffect(() => {
        updateBg();
    }, []);

    function updateBg() {
        switch (weatherInfos.weather[0].main) {
            case 'Clear':
                setBackground('rgb(79, 173, 255)');
                break;
            case 'Drizzle':
                setBackground('');
                break;
            default:
                break;
        }
    }

    return (
        <div className='weather-bar-main' style={styles.weatherbar}>
            <WeatherLogos />
            <div>
                <p>{weatherInfos.main.temp}</p>
            </div>
            <div>
                <p>{weatherInfos.main.feels_like}</p>
            </div>
        </div>
    );
}

export default WeatherBar;
