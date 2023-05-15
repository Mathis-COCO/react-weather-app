/* eslint-disable new-cap */
/* eslint-disable react/no-unknown-property */
/* eslint-disable capitalized-comments */
/* eslint-disable no-unused-vars */

/* eslint-disable indent */
import React, {useContext, useEffect, useState} from 'react';
import '../css/WeatherBar.scss';
import {WeatherContext} from '../providers/weather-provider';
import WeatherLogos from './WeatherLogos';
import Graph from './Graphs';
import {useLocation} from 'react-router-dom';
import SearchBar from './SearchBar';
import WeatherMap from './Map';

function WeatherBar() {
    const [weatherInfos, updateWeather] = useContext(WeatherContext);
    const location = useLocation();
    const sunset = new Date(weatherInfos.sys.sunset * 1000);
    const sunrise = new Date(weatherInfos.sys.sunrise * 1000);
    const [tempColor, setTempColor] = useState('black');
    const styles = {
        temp: {
            color: tempColor,
        },
    };

    function TempColor() {
        if (weatherInfos.main.temp > 25) {
            setTempColor('rgb(241, 65, 49)');
        } else if (weatherInfos.main.temp < 15) {
            setTempColor('rgb(12, 117, 223)');
        } else {
            setTempColor('rgb(223, 203, 26)');
        }
    }

    useEffect(() => {
        TempColor();
    }, [weatherInfos.main.temp]);

    return (
        <div className='weather-bar-main'>
            <SearchBar />
            <div className='inline space-between'>
                <div className='logos-container'>
                    <WeatherLogos />
                </div>
                { location.pathname === '/map' ? (
                    <div className='current-temp-container'>
                        <p style={styles.temp}>{weatherInfos.main.temp}°C</p>
                    </div>
                ) : null }
            </div>
            <div className='graph-container'>
                <Graph type='temp'/>
            </div>
            <div className='graph-container'>
                <Graph type='climat'/>
            </div>
            <div className='inline'>
                <div className='sun-container'>
                    <img width='60' height='60' src='https://img.icons8.com/fluency-systems-regular/100/sunrise.png' alt='sunrise'/>
                    <p className='sun-txt'>{sunrise.getHours().toString().padStart(2, '0')}:{sunrise.getMinutes().toString().padStart(2, '0')}</p>
                </div>
                <div className='sun-container'>
                    <img width='60' height='60' src='https://img.icons8.com/fluency-systems-regular/100/sunset.png' alt='sunset'/>
                    <p className='sun-txt'>{sunset.getHours().toString().padStart(2, '0')}:{sunset.getMinutes().toString().padStart(2, '0')}</p>
                </div>
            </div>
            <div className='inline space-between'>
                <div className='sphere'>
                    <WeatherMap height={100} width={100} zoom={0} />
                </div>
                <div className='city-name-container'>
                    <p className='sun-container city-name'>{weatherInfos.name}</p>
                </div>
            </div>

        </div>
    );
}

export default WeatherBar;
