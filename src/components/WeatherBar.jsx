/* eslint-disable react/prop-types */
/* eslint-disable arrow-parens */
/* eslint-disable indent */
import React from 'react';
import '../css/SearchResults.scss';

function WeatherBar(props) {
    const weatherInfos = {props};
    console.log(weatherInfos);
    return (
        <div>
            <div>
                <p>{weatherInfos}</p>
            </div>
            <div>
                <p>{weatherInfos}</p>
            </div>
            <div>
                <p>{weatherInfos}</p>
            </div>
        </div>
    );
}

export default WeatherBar;
