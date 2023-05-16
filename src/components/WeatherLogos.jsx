/* eslint-disable capitalized-comments */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable arrow-parens */
/* eslint-disable indent */
import React, {useContext, useEffect, useState} from 'react';
import CrossfadeImage from 'react-crossfade-image';
import '../css/WeatherLogos.scss';
import {WeatherContext} from '../providers/weather-provider';

function WeatherLogos(props) {
    const weatherInfos = useContext(WeatherContext);
    const imageUrl = `https://openweathermap.org/img/wn/${weatherInfos[0].weather[0].icon}@2x.png`;
    const [img, setImg] = useState();

    const fetchImage = async () => {
      const res = await fetch(imageUrl);
      const imageBlob = await res.blob();
      const imageObjectURL = URL.createObjectURL(imageBlob);
      setImg(imageObjectURL);
    };

    useEffect(() => {
      fetchImage();
    }, [props]);

    return (
        <div>
            <div className='weather-logo-main'>
                { img && (
                    <CrossfadeImage src={img} duration={3000} />
                )}
            </div>
        </div>
  );
}

export default WeatherLogos;
