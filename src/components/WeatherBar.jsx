/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-expressions */
/* eslint-disable new-cap */

/* eslint-disable no-unused-vars */

/* eslint-disable indent */
import React, {useContext, useEffect, useState} from 'react';
import '../css/WeatherBar.scss';
import {WeatherContext} from '../providers/weather-provider';
import WeatherLogos from './WeatherLogos';
import Graph from './Graphs';
import {useLocation} from 'react-router-dom';
import SearchBar from './SearchBar';
import WeatherMap from './Map';
import {faTemperatureArrowDown, faTemperatureArrowUp, faTemperatureHigh, faTemperatureThreeQuarters} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faStar, faTrashCan} from '@fortawesome/free-regular-svg-icons';

function WeatherBar() {
    const [weatherInfos, updateWeather] = useContext(WeatherContext);
    const location = useLocation();
    const sunset = new Date(weatherInfos.sys.sunset * 1000);
    const sunrise = new Date(weatherInfos.sys.sunrise * 1000);
    const [tempColor, setTempColor] = useState('black');
    const [namePadding, setNamePadding] = useState('0px');
    const [switchTemp, setSwitchTemp] = useState(1);
    const [cityHistory, setCityHistory] = useState([]);
    const [updatedCityHistory, setUpdatedCityHistory] = useState([]);
    const styles = {
        temp: {
            color: tempColor,
        },
        name: {
            paddingLeft: namePadding,
        },
    };

    function TempColor() {
        if (weatherInfos.main.temp > 25) {
            setTempColor('rgb(241, 65, 49)');
        } else if (weatherInfos.main.temp < 15) {
            setTempColor('rgb(12, 117, 223)');
        } else {
            setTempColor('rgb(223, 203, 26)');
        }
    }

    function ChangeNameWidth() {
        ((weatherInfos.name).length) > 15 ? setNamePadding(`${-20 + (16 * (((weatherInfos.name).length) - 15))}px`) : setNamePadding('0px');
    }

    function SwitchTemp() {
        switchTemp ? setSwitchTemp(0) : setSwitchTemp(1);
    }

    function RemoveFav(index) {
        const updatedHistory = updatedCityHistory.filter((_, i) => i !== index);
        setUpdatedCityHistory(updatedHistory);
        console.log(updatedHistory);
    }

    function AddFav() {
        if (updatedCityHistory.length < 5 && !updatedCityHistory.includes(weatherInfos.name)) {
            setUpdatedCityHistory([localStorage.getItem('cities')]);
            setUpdatedCityHistory(updatedCityHistory.concat(weatherInfos.name));
            localStorage.setItem('cities', JSON.stringify(updatedCityHistory));
            setCityHistory(updatedCityHistory);
        }
    }

    useEffect(() => {
        TempColor();
    }, [weatherInfos.main.temp]);

    useEffect(() => {
        ChangeNameWidth();
    }, [weatherInfos.name]);

    return (
        <div className='weather-bar-main'>
            <SearchBar />
            <div className='inline space-between'>
                <div className='logos-container'>
                    <WeatherLogos />
                </div>
                <div className='city-name-container sun-container'>
                    <div className='city-name-subcontainer' style={styles.name}>
                        <p className=' city-name'>{weatherInfos.name}</p>
                    </div>
                </div>
            </div>
            <div className='graph-container'>
                <Graph type='temp'/>
            </div>
            <div className='graph-container'>
                <Graph type='climat'/>
            </div>
            <div className='inline'>
                <div className='sun-container'>
                    <img height={50} width={50} src='data:image/png;base64,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' />
                    <p className='sun-txt sun-txt-1'>{sunrise.getHours().toString().padStart(2, '0')}:{sunrise.getMinutes().toString().padStart(2, '0')}</p>
                </div>
                <div className='sun-container'>
                    <img width={50} height={50} src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFlUlEQVR4nO2dXWgcVRSArz/tzjmbKNr6/4Mt1Uq652zqaqkU7KOiIK1Sq/UXH5UqETSVClbsQ1HriyI+tvVBUCnJ7r07KX3woSpVixXESJVWn0SoD/5Ua0JN5CabmjQzk9nsbu6d3fPBgSWbvXPP/XZ+zszdGaUEQRAEQRAEQRAEQRAEQVgQhnpyKwwHz2mCPk255TLsDtGMdxnCvw3j+EQQ/lVhvFOkOMIQ/nRWRi004Y8ixAGDhfwV58qYigOcv1ykLDBhMXdDnBD7nggRIZ1NKGuIX4QixC9CEbLwHCmpRbbwK5cUNirEtmHbsm0uWALthOFgsyE4WastTmnGbfMVYhhftEXjZPFo2ww2L3hCWSYs5ldpwtFZg03wer1C7GciisfRam9Xj7MEs4Ym3B432FNS0giJkjFNynbXeWYGzbgtVkhNylxCkmTUznu94DrPzKApt/zsNj9+QN+f13u1k5CDnFvmOs9MYQqwIXI/0mBMtFmADa7zyyS6iPdoxn+aKaNShI2u88o0uklSRIZHUrSsGf5I0SKjdVQLeHc9UkSGR1K0rBn+SNEiwx8pWmS4o1KEjdOl2NdSZzhmqCe3wp77smFfu+6PIAiCIAhCe3CkpBaVCW+x8fF6daHr/nQ0ld7FN2qCb/+/EgjfyKGvQwzjpxGV+iGXfepYDpYuuVgzjs0SwjhWXXPpRa7713GEMpXUL0IR4hehCPGLUIT4RShC/CIUIX5R7e26LO4SbrnUtdR1/zoSTfjFLCGEh133y7uJ0prBGIY/7GkNXcw/0qplhdS9UhMem1alHzO8+KZWLc8wPmYYhjXjn4ZAez9h+4O1CgzhidnfWnilZcvcpC6oEqy1YV+3ajk2h4jN43Gbs/IVO6s8dq5UC6W0mhgZE1EhuFf5SrWQfzhxAlsGpZgEGZObyeAh5Su6B6+c+4c22ZFi5pSBp+w9V5TP6GLwgCE8k5wI9CnP0QR9yV8sPKMJNqksYCi/JUmKZjy9/+buJcpTyqWupYnzh21ulN+isoTdtiZKoeCORq6FVIqwxu6zNMNWTdg/EQxb7d+qvXBbI9dEqoVgffKa4fF+Y55S/q0U4Zq07YwrdV65ENxuGN80DF/bzyduTmrLMARHNeFue0hcT7+rBNdGLiPLMmZIYRw5Z2e4O81nyyWFhuBpzfhDCgHJQfi9Jngqbd0wKX9GGyOZlzGFoTxpxrc0wd4KBw/O9f8vK3V+lfFJw/BLwyJmH1D8rAmfsGtdujUc9tm+2xxUJzLIuWVRkxeaLwYPyZ3n0vy8gOD3VsuYtrb85nWl7RJD8GzKnXVzw+6oGZ5xnb+PMsZdhiZ83vU4eIHdwUbNrzILLYRxTDM+qjqZKuPqGXemZudSTtuiUnUitsZoSn3BTQ7CEwdY5VWnEVF4jfsT8JrqwFpjRvXuU2jC0Y560oIheM/1oJu515I9qhMIS3hVK25MZpofI95ffGoGmvAlDwZ7POWmq1+1O7XT59kQwvilameGVgXX+VAEmvRCxgZWw9WqXaldG3E+0KauzZaH183tYapmfNswHEyIPZqwlNTOnPfSZR8DdiXmVIBbbe5JY2OvpzRtlmO5J7jeMPyaMoERUwzWxXaeccD9AGN9Qbg/Np9isC51PUVw0o5lw0Ls5db6EoAwNgHCzzMo5HB8PjBUT1ua4I1mCPmoviRgOCGBo84HmOsLTfBVbD4M39XVFuOHzRDSX2cCe+OF4LvZE4LvJHzB9tXVXjPuNz8x84Pxs5QLPW6n0CQ/6g6GXQ+ySR0wnPQIvonpQlGz/aPFfhL1YJp530/EMNxvCHbYo46IeLVC+PjAyiXdqX6yYB/WwrAzpq1dHsRO28c0U4ZszjZ3OwaRbRHs0Az3yZN9BEEQBEEQBEEQBEEQBNVm/Actj3GlsEx32AAAAABJRU5ErkJggg=='/>
                    <p className='sun-txt sun-txt-2'>{sunset.getHours().toString().padStart(2, '0')}:{sunset.getMinutes().toString().padStart(2, '0')}</p>
                </div>
            </div>
            <div className='city-minimap'>
                <div className='sphere-main-c'>
                    <div className='sphere-container'>
                        <div className='sphere'>
                            <WeatherMap height={150} width={150} zoom={0} />
                        </div>
                    </div>
                </div>
                <div onClick={SwitchTemp} className='temp-map-container'>
                    { switchTemp ? (
                        <><div className='temp-container'>
                            <FontAwesomeIcon style={styles.temp} icon={faTemperatureThreeQuarters} />
                            <p style={styles.temp}>{weatherInfos.main.temp} °C</p>
                        </div><div className='temp-container'>
                                <FontAwesomeIcon style={styles.temp} icon={faTemperatureHigh} />
                                <p style={styles.temp}>{weatherInfos.main.feels_like} °C</p>
                            </div></>
                    ) : (
                        <><div className='temp-container'>
                            <FontAwesomeIcon style={styles.temp} icon={faTemperatureArrowUp} />
                            <p style={styles.temp}>{weatherInfos.main.temp_max} °C</p>
                        </div><div className='temp-container'>
                            <FontAwesomeIcon style={styles.temp} icon={faTemperatureArrowDown} />
                            <p style={styles.temp}>{weatherInfos.main.temp_min} °C</p>
                        </div></>
                    )}
                </div>
            </div>
            <div className='fav-main-container'>
                { updatedCityHistory[0] && (
                    <div>
                        {updatedCityHistory.map((name, index) => (
                            <div className='fav-container' >
                                <div className='fav inline' key={index}>
                                    <div>
                                        <p className=' city-name fav-txt' >{name}</p>
                                    </div>
                                    <div className='delete-icon'>
                                        <FontAwesomeIcon className='fav-icon' icon={faTrashCan} onClick={() => RemoveFav(index)} />
                                    </div>
                                </div>
                            </div>

                        ))}
                    </div>
                )}
                <div>
                    { updatedCityHistory.length < 5 && (
                        <div className='fav-container' onClick={AddFav}>
                            <div className='fav inline'>
                                <div>
                                    <p id='city-count' className='city-name fav-name'>{updatedCityHistory.length}/5</p>
                                    <p id='add-to-fav' className='add-to-fav'>ajouter aux favoris</p>
                                </div>
                                <div id='star-icon' className='star-icon'>
                                    <FontAwesomeIcon className='fav-icon' icon={faStar} />
                                </div>
                            </div>
                        </div>

                    )}
                </div>

            </div>
        </div>
    );
}

export default WeatherBar;
