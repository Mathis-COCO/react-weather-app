/* eslint-disable capitalized-comments */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import {React, useState} from 'react';
import '../css/App.scss';
import {FiSearch} from 'react-icons/fi';
import SearchResults from '../components/SearchResults';
import WeatherMap from '../components/Map.jsx';
import Navbar from '../components/Navbar';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faGear, faUpRightAndDownLeftFromCenter} from '@fortawesome/free-solid-svg-icons';

function Homepage() {
    const [location, setLocation] = useState('');
    const [allInfos, setAllInfos] = useState('');
    const [showResults, setShowResults] = useState(false);
    const [margin, setMargin] = useState(40);
    const [showMap, setShowMap] = useState(true);
    const APIKey = process.env.REACT_APP_WEATHER_API_KEY;

    const updateLoc = event => {
        setLocation(event.target.value);
    };

    const styles = {
        searchbar: {
            transition: showMap === true ? 'all 1s ease-out' : 'all 1s ease-out 1s',
            marginTop: `${margin}vh`,
        },
        results: {
            height: showMap === true ? '690px' : '80px',
            transition: showMap === true ? 'height 1s ease 1s' : 'height 1s ease 0s',
        },
        map: {
            opacity: showMap === true ? 1 : 0,
            transition: showMap === true ? 'opacity 1s ease 1s' : 'opacity 1s ease 0s',
        },
    };

    function toggleMap() {
        if (showMap === true) {
            setShowMap(false);
            setMargin(40);
        } else {
            setShowMap(true);
            setMargin(10);
        }
    }

    function apiLocation(event) {
        event.preventDefault();
        if (location === '') {
            setShowResults(false);
            setMargin(40);
            // AJOUTER UNE ALERTE ICI
            return;
        }

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}
        &units=metric&appid=${APIKey}`).then(response => response.json()).then(json => {
            if (json.cod === '404') {
                setShowResults(false);
            }

            setShowResults(true);
            setMargin(10);
            setAllInfos(json);
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
                        <SearchResults {...allInfos.main} />
                        <div className='map-homepage' style={styles.map}>
                            <WeatherMap lat={allInfos.coord.lat} lon={allInfos.coord.lon} height={600} width={1000} />
                        </div>

                    </div>
                )}
            </div>
            <div className='option-parent'>
                <FontAwesomeIcon icon={faGear} />
                <button className='option-btn'><FontAwesomeIcon icon={faUpRightAndDownLeftFromCenter} /></button>
                <button onClick={toggleMap}>X</button>
            </div>
        </div>
    );
}

export default Homepage;
