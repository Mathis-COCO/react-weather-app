/* eslint-disable react/prop-types */
/* eslint-disable arrow-parens */
/* eslint-disable indent */
import React from 'react';
import '../css/SearchResults.scss';

function Humidity(props) {
    return (
        <div>
            <div>
                <p className='p-humidity'>{props.humidity + '%'}</p>
            </div>
        </div>
  );
}

export default Humidity;
