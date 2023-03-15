/* eslint-disable capitalized-comments */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import {React, useRef, useState} from 'react';
import '../css/App.scss';
import {FiSearch} from 'react-icons/fi';
import EmptyFIeld from '../components/EmptyField';

function Homepage() {
    const [location, setLocation] = useState('');
    const updateLoc = event => {
        setLocation(event.target.value);
    };

    function apiLocation() {
        console.log(location);

        const APIKey = '4156ad6137c93f56581b6364fd3ff8f7';

        if (location === '') {
            console.log('add alert here');
        }

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}
        &units=metric&appid=${APIKey}`).then(response => response.json()).then(json => {
            if (json.cod === '404') {
                console.log('erreur 404');
            }

            return (
                console.log(json.main.temp)
            );
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
            </div>
        </div>
    );
}

export default Homepage;
