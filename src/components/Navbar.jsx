/* eslint-disable capitalized-comments */
/* eslint-disable react/prop-types */
/* eslint-disable arrow-parens */
/* eslint-disable indent */
import React, {useEffect, useState} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import '../css/Navbar.scss';
import siteLogo from '../img/icon2.png';

function Navbar() {
    let coords = {latitude: 48.8534, longitude: 2.3488};
    const [currentPosition, setCurrentPosition] = useState();
    const location = useLocation();
    const styles = {background: location.pathname === '/' ? 'rgba(89, 89, 89, 0.459)' : 'rgb(79, 173, 255)'};
    const navigate = useNavigate();
    const handleClick = () => navigate('/');
    const APIKey = process.env.REACT_APP_WEATHER_NAV_API_KEY;

    useEffect(() => {
        getTemp();
        getLocation();
    }, []);

    async function getLocation() {
        navigator.geolocation.getCurrentPosition((position) => {
            coords = ({latitude: position.coords.latitude, longitude: position.coords.longitude});
            getTemp();
        });
    }

    const getTemp = () => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&units=metric&appid=${APIKey}`).then(response => response.json()).then(json => {
            const location = json.name;
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}
            &units=metric&appid=${APIKey}`).then(response => response.json()).then(json => {
                setCurrentPosition(json);
            });
        });
    };

    return (
        <div className='navbar-c-main' style={styles}>
            <div className='inline navbar-height'>
                <Link to={'/'} className='inline navbar-left' onClick={handleClick}>
                    <div className='navbar-c-logo'>
                        <img src={siteLogo} alt='weather-logo' className='navbar-logo' />
                    </div>
                    <p className='navbar-title'>Weather App</p>
                </Link>
                { currentPosition && (
                    <div className='inline navbar-right'>
                        {currentPosition.name} {currentPosition.main.temp}°C
                    </div>
                )}
            </div>
        </div>
  );
}

export default Navbar;
