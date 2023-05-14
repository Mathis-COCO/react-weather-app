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
} from 'chart.js';

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
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
    console.log(graphInfos);
    const data = {
        labels: dateValues,
        datasets: [{
            data: tempValues,
            backgroundColor: 'lightBlue',
            borderColor: 'green',
            borderWidth: '2',
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
            data: windValues,
            backgroundColor: 'lightBlue',
            borderColor: 'lightBlue',
            borderWidth: '2',
        }],
    };
    console.log(windValues);

    return (
        <div>
            <div className='graph-main'>
                {type === 'temp'
                    && <Line data={data} options={options}></Line>
                }
                {type === 'climat'
                    && <Line data={data2} options={options}></Line>
                }
            </div>
        </div>
  );
}

export default Graph;
