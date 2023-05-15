/* eslint-disable no-negated-condition */
/* eslint-disable no-unused-expressions */
/* eslint-disable operator-linebreak */
/* eslint-disable capitalized-comments */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable arrow-parens */
/* eslint-disable indent */
import React, {useContext, useEffect, useState} from 'react';
import '../css/Graphs.scss';
import {WeatherContext} from '../providers/weather-provider';
import {Line} from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Filler,
} from 'chart.js';

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Filler,
);

function Graph(props) {
    const {type} = props;
    const [weatherInfos, updateWeather, graphInfos, updateGraph] = useContext(WeatherContext);
    const dateValues = graphInfos.list.map((item) => {
        const date = new Date(item.dt_txt);
        const hours = String(date.getHours()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${month}-${day} ${hours}h`;
    });
    const tempValues = graphInfos.list.map((item) => item.main.temp);
    const windValues = graphInfos.list.map((item) => item.wind.speed);
    const [showData, setShowData] = useState([0, 0]);
    const currentDate = new Date();
    const [tempDataPopup, setTempDataPopup] = useState([]);
    dateValues.unshift('now');
    tempValues.unshift(weatherInfos.main.temp);
    windValues.unshift(weatherInfos.wind.speed);
    const data = {
        labels: dateValues,
        datasets: [{
            data: tempValues,
            fill: true,
            borderColor: 'green',
            borderWidth: '2',
            tension: 0.4,
        }],
    };

    const options = {
        plugins: {
            legend: false,
        },
    };

    const data2 = {
        labels: dateValues,
        datasets: [{
            fill: true,
            backgroundColor: 'rgba(46, 144, 205, 0.1)',
            data: windValues,
            borderColor: 'lightBlue',
            borderWidth: '2',
            tension: 0.4,
        }],
    };

    function handleDataClick(clicked) {
        const newArray = [];
        if (clicked === '1') {
            newArray.push([`${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')} now ${weatherInfos.main.temp}°C <br>`]);
            showData[0] ? setShowData([0, ...showData.slice(1)]) : setShowData([1, ...showData.slice(1)]);
            for (let i = 1; i < dateValues.length || i < tempValues.length; i++) {
                if (i < tempValues.length) {
                    newArray.push(`${dateValues[i]} ${tempValues[i]}°C <br>`);
                }
            }
        }

        if (clicked === '2') {
            newArray.push([`${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')} now ${weatherInfos.wind.speed}°km/h <br>`]);
            showData[1] ? setShowData([...showData.slice(0), 0]) : setShowData([...showData.slice(0), 1]);
            for (let i = 1; i < dateValues.length || i < windValues.length; i++) {
                if (i < tempValues.length) {
                    newArray.push(`${dateValues[i]} ${windValues[i]}km/h <br>`);
                }
            }
        }

        setTempDataPopup(newArray);
    }

    return (
        <div>
            <div className='graph-main'>
                {type === 'temp'
                    &&
                    <div onClick={() => handleDataClick('1')}>
                        { !showData[0] ? (
                            <Line data={data} options={options} ></Line>
                        ) : (
                            <div className='temp-data-popup'>
                                <p dangerouslySetInnerHTML={{__html: tempDataPopup}}></p>
                            </div>
                        )}
                    </div>
                }
                {type === 'climat'
                    &&
                    <div onClick={() => handleDataClick('2')}>
                    { !showData[1] ? (
                        <Line data={data2} options={options} ></Line>
                    ) : (
                        <div className='temp-data-popup'>
                            <p dangerouslySetInnerHTML={{__html: tempDataPopup}}></p>
                        </div>
                    )}
                </div>
                }
            </div>
        </div>
);
}

export default Graph;
