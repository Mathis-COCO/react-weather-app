/* eslint-disable capitalized-comments */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import {React, useState} from 'react';
import '../css/App.scss';
import {FiSearch} from 'react-icons/fi';
import Temp from '../components/Temp';
import {useNavigate} from 'react-router-dom';

function Homepage() {
    const [location, setLocation] = useState('');
    const [searchInfos, setInfos] = useState('');
    const [showResults, setShowResults] = useState(false);
    const APIKey = process.env.REACT_APP_WEATHER_API_KEY;
    // METTRE L'API KEY DANS UNE VARIABLE D'ENVIRONNEMENT

    console.log(process.env);
    const updateLoc = event => {
        setLocation(event.target.value);
    };

    function apiLocation() {
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
                useNavigate('/');
            }

            setInfos(json.main);
            console.log(searchInfos);
        });
    }

    return (
        <div className='main-div'>
            <h1 className='home-title'>HOMEPAGE</h1>
            <div>
                <div className='searchbar'>
                    <input onChange={updateLoc} type='text' placeholder='Rechercher...'/>
                    <button onClick={apiLocation}><FiSearch color='white' fontSize='1.5em' /></button>
                </div>
                { showResults
                    ? <div>
                        <Temp temp={searchInfos.temp} />
                        <p className='tempBox'></p>
                      </div>
                : null }

            </div>
        </div>
    );
}

export default Homepage;
