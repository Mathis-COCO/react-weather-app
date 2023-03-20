/* eslint-disable react/prop-types */
/* eslint-disable arrow-parens */
/* eslint-disable indent */
import React from 'react';
import '../css/SearchResults.scss';

function Temp(props) {
    return (
        <div>
            <div>
                <p className='p-temperature'>{props.temp + '°C'}</p>
            </div>
        </div>
  );
}

export default Temp;
