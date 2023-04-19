/* eslint-disable capitalized-comments */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import {React, useState} from 'react';
import '../css/App.scss';
import {FiSearch} from 'react-icons/fi';
import SearchResults from '../components/SearchResults';
import WeatherMap from '../components/Map.jsx';
import Navbar from '../components/Navbar';

function Homepage() {
    const [location, setLocation] = useState('');
    const [allInfos, setAllInfos] = useState('');
    const [showResults, setShowResults] = useState(false);
    const [margin, setMargin] = useState(40);
    const APIKey = process.env.REACT_APP_WEATHER_API_KEY;

    const updateLoc = event => {
        setLocation(event.target.value);
    };

    const styles = {
        searchbar: {
            transition: 'all 1s ease-out',
            marginTop: `${margin}vh`,
        },
        results: {
            opacity: 1,
        },
    };

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
                { showResults
                    ? <div className='results-card' style={styles.results}>
                        <SearchResults {...allInfos.main} />
                        <div className='map-homepage'>
                            <WeatherMap lat={allInfos.coord.lat} lon={allInfos.coord.lon} height={700} width={1000} />
                        </div>
                      </div>
                : null }
            </div>
        </div>
    );
}

export default Homepage;
