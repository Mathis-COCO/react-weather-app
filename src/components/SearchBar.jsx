/* eslint-disable capitalized-comments */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import {React, useContext, useState} from 'react';
import '../css/SearchBar.scss';
import {FiSearch} from 'react-icons/fi';
import {WeatherContext} from '../providers/weather-provider';

export default function SearchBar() {
    const [location, setLocation] = useState('');
    const [weatherInfos, updateWeather, graphInfos, updateGraph] = useContext(WeatherContext);
    const APIKey = process.env.REACT_APP_WEATHER_API_KEY;
    let foreWeather = null;
    let cityHistory = [];

    const updateLoc = event => {
        setLocation(event.target.value);
    };

    function apiLocation(event) {
        event.preventDefault();
        if (location === '') {
            return;
        }

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}
        &units=metric&appid=${APIKey}`).then(response => response.json()).then(weather => {
            if (weather.cod === '404') {
                console.log('Erreur 404.');
            }

            fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${weather.coord.lat}&lon=${weather.coord.lon}&units=metric&appid=${APIKey}`).then(response => response.json()).then(forecastWeather => {
                foreWeather = forecastWeather;
                updateGraph(foreWeather);
                updateWeather(weather);
            });
        });

        cityHistory = localStorage.getItem('cities');
        cityHistory.concat(location);
        localStorage.setItem('cities', JSON.stringify(`${location}`));
        console.log(cityHistory);
    }

    return (
        <div>
            <form onSubmit={apiLocation} className='left-searchbar' >
                <input onChange={updateLoc} type='text' placeholder='Rechercher...'/>
                <div>
                    <button type='submit'><FiSearch color='deepskyblue' fontSize='1.5em' /></button>
                </div>
            </form>
        </div>
    );
}
