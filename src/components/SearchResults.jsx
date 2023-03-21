/* eslint-disable react/prop-types */
/* eslint-disable arrow-parens */
/* eslint-disable indent */
import React from 'react';
import '../css/SearchResults.scss';
import Temp from './Temp.jsx';
import Humidity from './Humidity.jsx';

function SearchResults(props) {
    return (
        <div>
            <div className='search-results-bg'>
                <Temp temp={props.temp} />
                <Humidity humidity={props.humidity} />
            </div>
        </div>
  );
}

export default SearchResults;
