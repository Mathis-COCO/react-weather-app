/* eslint-disable capitalized-comments */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable arrow-parens */
/* eslint-disable indent */
import React, {useEffect, useState} from 'react';
import CrossfadeImage from 'react-crossfade-image';
import '../css/WeatherLogos.scss';

function WeatherLogos(props) {
    const {weatherType} = props;
    const imageUrl = `https://openweathermap.org/img/wn/${weatherType.weather[0].icon}@2x.png`;
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
                    <CrossfadeImage src={img} />
                )}
            </div>
        </div>
  );
}

export default WeatherLogos;
