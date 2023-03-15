/* eslint-disable indent */
import React from 'react';
import '../css/App.scss';
import {FiSearch} from 'react-icons/fi';

function Homepage() {
  return (
    <div className='main-div'>
        <h1 className='home-title'>HOMEPAGE</h1>
        <div>
            <div className='searchbar'>
                <input type='text' placeholder='Rechercher...'/>
                <div><FiSearch color='white' fontSize='1.5em' /></div>
            </div>
        </div>
    </div>
  );
}

export default Homepage;
