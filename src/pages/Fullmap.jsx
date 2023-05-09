/* eslint-disable capitalized-comments */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import {React, useRef} from 'react';
import WeatherMap from '../components/Map';
import Navbar from '../components/Navbar';

function Fullmap() {
    const windowSize = useRef([window.innerWidth, window.innerHeight]);
    return (
        <div className='main-div'>
            <Navbar />
            <WeatherMap
            height={windowSize.current[1] - 56}
            width={windowSize.current[0]}
            />
        </div>

    );
}

export default Fullmap;
