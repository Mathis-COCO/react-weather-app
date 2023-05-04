/* eslint-disable key-spacing */
/* eslint-disable object-shorthand */
/* eslint-disable no-unused-vars */
/* eslint-disable capitalized-comments */
/* eslint-disable react/prop-types */
/* eslint-disable arrow-parens */
/* eslint-disable indent */
import React, {useContext, useEffect, useRef, useState} from 'react';
import {MapContainer, Marker, Popup, TileLayer, useMap, useMapEvent} from 'react-leaflet';
import osm from '../providers/osm-providers';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import WeatherProvider, {WeatherContext} from '../providers/weather-provider';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

function WeatherMap(props) {
    const animateRef = useRef();
    const {lat, lon, height, width, temp, city} = props;
    const [position, setPosition] = useState({lat: lat, lng: lon});
    const [weatherInfos, updateWeather] = useContext(WeatherContext);
    const APIKey = process.env.REACT_APP_WEATHER_NAV_API_KEY;
    const styles = {
        mapContainer: {
            height,
            width,
        },
    };

    useEffect(() => {
        setPosition({lat: lat, lng: lon});
        getTemp({lat: lat, lng: lon});
    }, [lat, lon]);

    function ChangeView() {
        const map = useMap();
        map.flyTo([position.lat, position.lng], 12);
        return null;
    }

    function SetViewOnClick({animateRef}) {
        const map = useMapEvent('click', (e) => {
            map.setView(e.latlng, map.getZoom(), {
                animate: animateRef.current || true,
            });
            setPosition(e.latlng);
            getTemp(e.latlng);
        });
    }

    const getTemp = (position) => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.lat}&lon=${position.lng}&units=metric&appid=${APIKey}`).then(response => response.json()).then(json => {
            updateWeather(json);
        });
    };

    return (
        <div className='map-main-container'>
            <MapContainer className='map-container' center={position} zoom={9} scrollWheelZoom={true} style={styles.mapContainer}>
                <TileLayer url={osm.maptiler.url} attribution={osm.maptiler.attribution} />
                <ChangeView zoom={12} />
                <Marker position={position}>
                    <Popup>
                        <p>{weatherInfos.name}</p>
                        <p>{weatherInfos.main.temp} °C</p>
                    </Popup>
                </Marker>
                <SetViewOnClick animateRef={animateRef} />
            </MapContainer>
        </div>

    );
}

export default WeatherMap;
