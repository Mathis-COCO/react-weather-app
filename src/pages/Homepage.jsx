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
import WeatherProvider, {WeatherContext} from '../providers/weather-provider';

export default function Homepage() {
    const [location, setLocation] = useState('');
    const [showResults, setShowResults] = useState(false);
    const [margin, setMargin] = useState(40);
    const [showMap, setShowMap] = useState(true);
    const [resultHeight, setResultHeight] = useState(0);
    const [weatherInfos, updateWeather] = useContext(WeatherContext);
    const APIKey = process.env.REACT_APP_WEATHER_API_KEY;

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
        map: {
            opacity: showMap ? 1 : 0,
            transition: showMap ? 'opacity 1s ease 1s' : 'opacity 1s ease 0s',
        },
    };

    function toggleMap() {
        if (showMap) {
            setShowMap(false);
            setMargin(40);
            setResultHeight(80);
        } else {
            setShowMap(true);
            setMargin(10);
            setResultHeight(690);
        }
    }

    function apiLocation(event) {
        event.preventDefault();
        if (location === '') {
            setShowResults(false);
            setMargin(40);
            setResultHeight(0);
            // AJOUTER UNE ALERTE ICI
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
                }, 0);
            } else if (!showMap) {
                setResultHeight(80);
            }

            updateWeather(json);
        });
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
                    <div className='results-card' style={styles.results}>
                        <SearchResults {...weatherInfos.main} />
                        <div className='map-homepage' style={styles.map}>
                            <WeatherMap lat={weatherInfos.coord.lat} lon={weatherInfos.coord.lon} height={600} width={1000} temp={weatherInfos.main.temp} city={weatherInfos.name} />
                        </div>
                    </div>
                )}
            </div>
            { showResults && (
                <div className='option-parent'>
                    <FontAwesomeIcon icon={faGear} className='option-sub-btn' />
                    <button className='option-sub-btn'><FontAwesomeIcon icon={faUpRightAndDownLeftFromCenter} /></button>
                    <button className='option-sub-btn' onClick={toggleMap}>X</button>
                </div>
            )}
        </div>
    );
}
