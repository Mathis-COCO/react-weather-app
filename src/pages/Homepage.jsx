/* eslint-disable capitalized-comments */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import {React, useContext, useState} from 'react';
import '../css/App.scss';
import {FiSearch} from 'react-icons/fi';
import SearchResults from '../components/SearchResults';
import WeatherMap from '../components/Map.jsx';
import Navbar from '../components/Navbar';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faGear, faUpRightAndDownLeftFromCenter} from '@fortawesome/free-solid-svg-icons';
import {WeatherContext} from '../providers/weather-provider';
import WeatherBar from '../components/WeatherBar';
import {Link} from 'react-router-dom';

export default function Homepage() {
    const [location, setLocation] = useState('');
    const [showResults, setShowResults] = useState(false);
    const [margin, setMargin] = useState(40);
    const [showMap, setShowMap] = useState(true);
    const [resultHeight, setResultHeight] = useState(0);
    const [weatherInfos, updateWeather] = useContext(WeatherContext);
    const [showBar, setShowBar] = useState(false);
    const APIKey = process.env.REACT_APP_WEATHER_API_KEY;
    let cityHistory = [];

    const updateLoc = event => {
        setLocation(event.target.value);
    };

    const styles = {
        searchbar: {
            transition: showMap ? 'all 1s ease-out' : 'all 1s ease-out 1s',
            marginTop: `${margin}vh`,
        },
        results: {
            height: `${resultHeight}px`,
            transition: showMap ? 'height 1s ease 1s' : 'height 1s ease 0s',
        },
        leftbar: {
            opacity: showBar ? 1 : 0,
            transition: showBar ? 'opacity 1s ease 1s' : 'opacity 1s ease 0s',
        },
        map: {
            opacity: showMap ? 1 : 0,
            transition: showMap ? 'opacity 1s ease 1s' : 'opacity 1s ease 0s',
        },
    };

    function toggleMap() {
        if (showMap) {
            setShowMap(false);
            setShowBar(false);
            setMargin(40);
            setResultHeight(80);
        } else {
            setShowMap(true);
            setMargin(10);
            setResultHeight(690);
            setShowBar(true);
        }
    }

    function toggleBar() {
        if (showBar) {
            setShowBar(false);
        } else {
            setShowBar(true);
        }
    }

    function apiLocation(event) {
        event.preventDefault();
        if (location === '') {
            setShowResults(false);
            setMargin(40);
            setResultHeight(0);
            return;
        }

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}
        &units=metric&appid=${APIKey}`).then(response => response.json()).then(json => {
            if (json.cod === '404') {
                setShowResults(false);
            }

            setShowResults(true);
            if (showMap) {
                setMargin(10);
                setResultHeight(0);
                setTimeout(() => {
                    setResultHeight(690);
                    setShowBar(true);
                }, 0);
            } else if (!showMap) {
                setResultHeight(80);
            }

            updateWeather(json);
        });
        cityHistory = localStorage.getItem('cities');
        cityHistory.concat(location);
        localStorage.setItem('cities', JSON.stringify(`${location}`));
        console.log(cityHistory);
    }

    return (
        <div className='main-div'>
            <Navbar />
            <div>
                <form onSubmit={apiLocation} className='searchbar' style={styles.searchbar} >
                    <input onChange={updateLoc} type='text' placeholder='Rechercher...'/>
                    <div>
                        <button type='submit'><FiSearch color='white' fontSize='1.5em' /></button>
                    </div>
                </form>
                { showResults && (
                    <div className='result-container'>
                        <div style={styles.leftbar} className='left-bar' >
                            <WeatherBar />
                        </div>
                        <div className='results-card' style={styles.results}>
                            <SearchResults />
                            <div className='map-homepage' style={styles.map}>
                                <WeatherMap height={600} width={1000} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
            { showResults && (
                <div className='option-parent'>
                    <FontAwesomeIcon icon={faGear} className='option-sub-btn' />
                    <button onClick={toggleBar}>+</button>
                    <button><Link to={'/map'} className='option-sub-btn'><FontAwesomeIcon icon={faUpRightAndDownLeftFromCenter} /></Link></button>
                    <button className='option-sub-btn' onClick={toggleMap}>X</button>
                </div>
            )}
        </div>
    );
}
