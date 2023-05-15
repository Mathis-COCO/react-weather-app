/* eslint-disable capitalized-comments */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import {React, useRef} from 'react';
import WeatherMap from '../components/Map';
import Navbar from '../components/Navbar';
import WeatherBar from '../components/WeatherBar';
import '../css/FullMap.scss';

function Homepage() {
    const windowSize = useRef([window.innerWidth, window.innerHeight]);
    return (
        <div className='full-map-container'>
            <div className='weatherbar-container'>
                <WeatherBar />
            </div>
            <Navbar />
            <div className='fullmap-container'>
                <WeatherMap
                height={windowSize.current[1] - 56}
                width={windowSize.current[0]}
                zoom={12}
                />
            </div>
        </div>

    );
}

export default Homepage;
