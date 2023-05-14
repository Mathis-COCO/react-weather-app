/* eslint-disable capitalized-comments */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import {React, useContext, useState} from 'react';
import '../css/SearchBar.scss';
import {FiSearch} from 'react-icons/fi';
import {WeatherContext} from '../providers/weather-provider';

export default function SearchBar() {
    const [userLocation, setUserLocation] = useState('');
    const [weatherInfos, updateWeather, graphInfos, updateGraph, location, setLocation] = useContext(WeatherContext);
    let cityHistory = [];

    const updateLoc = event => {
        setUserLocation(event.target.value);
    };

    function apiLocation(event) {
        event.preventDefault();
        if (location === '') {
            return;
        }

        setLocation(userLocation);
        localStorage.setItem('cities', JSON.stringify(`${location}`));
        cityHistory = localStorage.getItem('cities');
        cityHistory.concat(location);
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
