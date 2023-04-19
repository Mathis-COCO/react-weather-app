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
    let apiResponseBody = {};
    const [showResults, setShowResults] = useState(false);
    const APIKey = process.env.REACT_APP_WEATHER_API_KEY;

    const updateLoc = event => {
        setLocation(event.target.value);
    };

    function apiLocation(event) {
        event.preventDefault();
        if (location === '') {
            setShowResults(false);
            console.log('add alert here');
            return;
        }

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}
        &units=metric&appid=${APIKey}`).then(response => response.json()).then(json => {
            if (json.cod === '404') {
                setShowResults(false);
            }

            setShowResults(true);
            apiResponseBody = json;
            setAllInfos(apiResponseBody);
            console.log(apiResponseBody);
        });
    }

    return (
        <div className='main-div'>
            <Navbar />
            {/* <img src='../img/{allInfos.weather[0].main}.gif' alt='background effect' /> */}
            <div>
                <form onSubmit={apiLocation} className='searchbar'>
                    <input onChange={updateLoc} type='text' placeholder='Rechercher...'/>
                    <button type='submit'><FiSearch color='white' fontSize='1.5em' /></button>
                </form>
                { showResults
                    ? <div>
                        <SearchResults {...allInfos.main} />
                        <div className='map-homepage'>
                            <WeatherMap
                                lat={allInfos.coord.lat}
                                lon={allInfos.coord.lon}
                                height={700}
                                width={1000}
                            />
                        </div>

                      </div>
                : null }

            </div>
        </div>
    );
}

export default Homepage;
