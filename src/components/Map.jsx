/* eslint-disable no-unused-vars */
/* eslint-disable capitalized-comments */
/* eslint-disable react/prop-types */
/* eslint-disable arrow-parens */
/* eslint-disable indent */
import React, {useRef, useState} from 'react';
import {MapContainer, Marker, Popup, TileLayer, useMap, useMapEvent} from 'react-leaflet';
import osm from '../providers/osm-providers';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

function ChangeView({center, zoom}) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
}

function WeatherMap(props) {
    const animateRef = useRef(false);
    const mapRef = useRef();
    const {lat, lon, height, width, temp, city} = props;
    const [position, setPosition] = useState([lat, lon]);
    const [markerCity, setMarkerCity] = useState(city);
    const [markerTemp, setMarkerTemp] = useState(temp);
    const APIKey = process.env.REACT_APP_WEATHER_NAV_API_KEY;
    const styles = {
        mapContainer: {
            height,
            width,
        },
    };

    function SetViewOnClick({animateRef}) {
        const map = useMapEvent('click', (e) => {
            setPosition(e.latlng);
            map.setView(e.latlng, map.getZoom(), {
                animate: animateRef.current || true,
            });
            getTemp(e.latlng);
        });
    }

    const getTemp = (position) => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.lat}&lon=${position.lng}&units=metric&appid=${APIKey}`).then(response => response.json()).then(json => {
            setMarkerCity(json.name);
            setMarkerTemp(json.main.temp);
        });
    };

    return (
        <div className='map-main-container'>
            <MapContainer className='map-container' center={position} zoom={9} scrollWheelZoom={true} ref={mapRef} style={styles.mapContainer}>
                <TileLayer url={osm.maptiler.url} attribution={osm.maptiler.attribution} />
                <ChangeView center={position} zoom={12} />
                <Marker position={position}>
                    <Popup>
                        <p>{markerCity}</p>
                        <p>{markerTemp} °C</p>
                    </Popup>
                </Marker>
                <SetViewOnClick animateRef={animateRef} />
            </MapContainer>
        </div>

    );
}

export default WeatherMap;
