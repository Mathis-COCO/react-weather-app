/* eslint-disable no-unused-vars */
/* eslint-disable capitalized-comments */
/* eslint-disable react/prop-types */
/* eslint-disable arrow-parens */
/* eslint-disable indent */
import React, {useState} from 'react';
import {MapContainer, TileLayer, useMap} from 'react-leaflet';
import osm from '../providers/osm-providers';
import 'leaflet/dist/leaflet.css';

function WeatherMap(props) {
    const {lat, lon} = props;

    const position = [lat, lon];

    const styles = {
        mapContainer: {
            height: 700,
            width: 1000,
        },
    };

    return (
        <div className='map-main-container'>
            <MapContainer className='map-container' center={position} zoom={9} scrollWheelZoom={true} style={styles.mapContainer}>
                <TileLayer url={osm.maptiler.url} attribution={osm.maptiler.attribution} />
            </MapContainer>
        </div>

    );
}

export default WeatherMap;
