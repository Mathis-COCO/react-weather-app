/* eslint-disable no-unused-vars */
/* eslint-disable capitalized-comments */
/* eslint-disable react/prop-types */
/* eslint-disable arrow-parens */
/* eslint-disable indent */
import React, {useRef, useState} from 'react';
import {MapContainer, TileLayer, useMap, useMapEvents} from 'react-leaflet';
import osm from '../providers/osm-providers';
import 'leaflet/dist/leaflet.css';

function ChangeView({center, zoom}) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
  }

function WeatherMap(props) {
    const mapRef = useRef();
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
            <MapContainer className='map-container' center={position} zoom={9} scrollWheelZoom={true} ref={mapRef} style={styles.mapContainer}>
                <TileLayer url={osm.maptiler.url} attribution={osm.maptiler.attribution} />
                <ChangeView center={position} zoom={9} />
            </MapContainer>
        </div>

    );
}

export default WeatherMap;
