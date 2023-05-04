/* eslint-disable react/prop-types */
/* eslint-disable arrow-parens */
/* eslint-disable indent */
import React from 'react';
import '../css/SearchResults.scss';
import Temp from './Temp.jsx';
import Humidity from './Humidity.jsx';
import WeatherLogos from './WeatherLogos';

function SearchResults(props) {
    return (
        <div className='space-evenly'>
            <Temp temp={props.temp} />
            <WeatherLogos></WeatherLogos>
            <Humidity humidity={props.humidity} />
        </div>
    );
}

export default SearchResults;
