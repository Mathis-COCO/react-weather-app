/* eslint-disable capitalized-comments */
/* eslint-disable react/prop-types */
/* eslint-disable arrow-parens */
/* eslint-disable indent */
import React from 'react';

function WeatherMap(props) {
    // const {/* mapType, */lat, lon} = props;
    console.log(props);
    console.log(typeof 1);

    const mapResponse = fetch(`https://tile.openweathermap.org/map/precipitation_new/${1}/${5}/${8}.png?appid=${process.env.REACT_APP_WEATHER_API_KEY}`);
    console.log(mapResponse);
    return (
        <div>
            <div>
                <p>Map Component</p>
            </div>
        </div>
  );
}

export default WeatherMap;
