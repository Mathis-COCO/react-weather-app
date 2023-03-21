/* eslint-disable capitalized-comments */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import {React, useState} from 'react';
import '../css/App.scss';
import {FiSearch} from 'react-icons/fi';
import SearchResults from '../components/SearchResults';

function Homepage() {
    const [location, setLocation] = useState('');
    const [searchInfos, setInfos] = useState('');
    const [weatherDesc, setDesc] = useState('');
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

        setShowResults(true);
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}
        &units=metric&appid=${APIKey}`).then(response => response.json()).then(json => {
            if (json.cod === '404') {
                setShowResults(false);
            }

            setInfos(json.main);
            setDesc(json.weather[0].main);
            console.log(searchInfos);
            console.log(weatherDesc);
        });
    }

    return (
        <div className='main-div'>
            <h1 className='home-title'>HOMEPAGE</h1>
            <img src='../img/{weatherDesc}.gif' alt='background effect' />
            <div>
                <form onSubmit={apiLocation} className='searchbar'>
                    <input onChange={updateLoc} type='text' placeholder='Rechercher...'/>
                    <button type='submit'><FiSearch color='white' fontSize='1.5em' /></button>
                </form>
                { showResults
                    ? <div>
                        <SearchResults {...searchInfos} />
                      </div>
                : null }

            </div>
        </div>
    );
}

export default Homepage;
