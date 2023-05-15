/* eslint-disable no-unused-vars */
/* eslint-disable capitalized-comments */
/* eslint-disable react/prop-types */
/* eslint-disable arrow-parens */
/* eslint-disable indent */
import React, {useContext, useEffect, useState} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import '../css/Navbar.scss';
import siteLogo from '../img/icon2.png';
import {WeatherContext} from '../providers/weather-provider';

function Navbar() {
    let coords = {latitude: 48.8534, longitude: 2.3488};
    const [currentPosition, setCurrentPosition] = useState();
    const pageLocation = useLocation();
    const styles = {background: pageLocation.pathname === '/old-site' ? 'rgba(89, 89, 89, 0.459)' : 'rgb(79, 173, 255)'};
    const navigate = useNavigate();
    const handleClick = () => navigate('/');
    const APIKey = process.env.REACT_APP_WEATHER_NAV_API_KEY;
    const [weatherInfos, updateWeather, graphInfos, updateGraph, location, setLocation] = useContext(WeatherContext);

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
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${json.coord.lat}&lon=${json.coord.lon}&units=metric&appid=${APIKey}`).then(response => response.json()).then(json => {
                setCurrentPosition(json);
            });
        });
    };

    function goToMyLoc() {
        setLocation(currentPosition.name);
    }

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
                    <div className='inline navbar-right' onClick={goToMyLoc}>
                        <img className='navbar-focus' width='30' height='30' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAC9ElEQVR4nO2Zz04UQRDGBwKKETx7FI/KHyMnl4NGXkENqM8AL4DhorLqWUmMF4lcCNFV4wuAGhOiF/UBMHhAXQxXNP5MZfsw1HbPzsx2z+7qfsedrqqvpqarq7+NooBAIepU0E2kzdCRFQEOAVPAAvAc+KwTMb9VzJqLQH/ULgDOAI+AXbJDbB4C461MYAx4hT+8BEaLTGAAuAf8xj9+AWWJETqJ48C7BCJV4DEwC5Qsz0vm2bJZ68IH4GTIT2nLEXgdmAYOK5sDsFR2Bthw+PwGTIRIYs8STBK7lGDnTEStuwJ8sfjf85aM+ZxslVgFjnoJUoszCKw5KjPcrPMjjj1xG+jxlUQsXq/Z7Brvm2oApjtp3PLK3h73jiXuYl5n45YWuxqiEo7KPLW05pE8zvRht+VzT6SIPwRsKw4v8owdGs7uFArUWrrGWBYHMjvFsR6UcTKX14rLUlrDfssAOB2csZvPdcXlB9CXxnDKYnjgxC4S1I4A/WIvpDGUu0Icy4UwTub0RHGaT2Mkl6I4Zgthm8xpTnF6lsZI3+zOFcI2mVNJcfpkW5QaLUggNbqJFAH+y4qk2OylqMUAJhtu9n+5/S604YG4kudAFAUwjmpweabxiPJTcTqfdmistvHQ+D3V0GiMRcaMYyM4YzuPHuCN4vIgi4MR4I9ycDkoazuPq9Qjm6xqtNg4RHcaDMa6Pv4x4KviUMnjaNRc+OMQ3ak3CPN68aGiYu8Dp/I6LHuTZbLFvWuJe7MZhwNGUNYoh6gMtUrYkths+pYqqriRLTVEdxryvCcqljg7wAlfQSYcIvZ20hmjFye02BnLxsbEPOslCZWMrTKYXn9NTwB6keXElsPurcPnjvckYsGHjaDswq4RCuYcf/RMmmcrlrEjjk1vn1ODBrBoac0+sC8ieaHyE3BatFiPSchGz3dOeEpIDs4lI+RlhQyA9+WlRO0CoE8UQOCGXHzkFmch/tG07XkZxVNPsa2GziLqVNBNpM1QZEX+Aq0HrjK6h55WAAAAAElFTkSuQmCC' alt='define-location--v1'/>
                        {currentPosition.name} {currentPosition.main.temp}°C
                    </div>
                )}
            </div>
        </div>
  );
}

export default Navbar;
