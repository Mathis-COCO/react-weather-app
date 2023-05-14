/* eslint-disable capitalized-comments */
/* eslint-disable no-unused-vars */

/* eslint-disable indent */
import React, {useContext, useEffect, useState} from 'react';
import '../css/WeatherBar.scss';
import {WeatherContext} from '../providers/weather-provider';
import WeatherLogos from './WeatherLogos';
import Graph from './Graphs';
import {useLocation} from 'react-router-dom';

function WeatherBar() {
    const [weatherInfos, updateWeather] = useContext(WeatherContext);
    const location = useLocation();
    console.log(location.pathname);
    // const [background, setBackground] = useState('rgba(255, 255, 255, 0.385)');
    // // console.log(weatherInfos.weather[0].main);
    // const styles = {
    //     weatherbar: {
    //         backgroundColor: background,
    //     },
    // };

    // useEffect(() => {
    //     updateBg();
    // }, []);

    // function updateBg() {
    //     switch (weatherInfos.weather[0].main) {
    //         case 'Clear':
    //             setBackground('rgba(79, 173, 255)');
    //             break;
    //         case 'Drizzle':
    //         case 'Rain ':
    //             setBackground('rgba(255, 255, 255, 0.385)');
    //             break;
    //         default:
    //             break;
    //     }
    // }

    // console.log(styles.weatherbar);

    return (
        <div className='weather-bar-main' /* style={styles.weatherbar} */>
            <div className='inline'>
                <div className='logos-container'>
                    <WeatherLogos />
                </div>
                { location.pathname === '/map' ? (
                    <div className='current-temp-container'>
                        <p>{weatherInfos.main.temp}</p>
                    </div>
                ) : null }
            </div>
            <div className='graph-container'>
                <Graph type='temp'/>
            </div>
            <div className='graph-container'>
                <Graph type='climat'/>
            </div>
        </div>
    );
}

export default WeatherBar;
