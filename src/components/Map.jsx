
/* eslint-disable no-unused-vars */

/* eslint-disable react/prop-types */
/* eslint-disable arrow-parens */
/* eslint-disable indent */
import React, {useContext, useEffect, useRef, useState} from 'react';
import {MapContainer, Marker, Popup, TileLayer, useMap, useMapEvent} from 'react-leaflet';
import osm from '../providers/osm-providers';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import {WeatherContext} from '../providers/weather-provider';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

function WeatherMap(props) {
    const animateRef = useRef();
    const [weatherInfos, updateWeather, graphInfos, updateGraph, location, setLocation] = useContext(WeatherContext);
    const {height, width, zoom} = props;
    const [currentZoom, setCurrentZoom] = useState(zoom);
    const [position, setPosition] = useState({lat: weatherInfos.coord.lat, lng: weatherInfos.coord.lon});
    const APIKey = process.env.REACT_APP_WEATHER_NAV_API_KEY;
    const params = new URLSearchParams(window.location.search);
    const styles = {
        mapContainer: {
            height,
            width,
        },
    };

    useEffect(() => {
        setPosition({lat: weatherInfos.coord.lat, lng: weatherInfos.coord.lon});
        getTemp({lat: weatherInfos.coord.lat, lng: weatherInfos.coord.lon});
        setCurrentZoom(zoom);
    }, [weatherInfos.coord.lat, weatherInfos.coord.lon]);

    function ChangeView() {
        const map = useMap();
        map.flyTo([position.lat, position.lng], zoom);
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
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.lat}&lon=${position.lng}&units=metric&appid=${APIKey}`).then(response => response.json()).then(weather => {
            updateWeather(weather);
            window.history.pushState(null, null, `?city=${weather.name}`);
            fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${weather.coord.lat}&lon=${weather.coord.lon}&units=metric&appid=${APIKey}`).then(response => response.json()).then(forecastWeather => {
                updateGraph(forecastWeather);
            });
        });
    };

    function UseEffectToUpdateMapSize(props) {
        const map = useMap();
        const containerRef = map.getContainer();
        const {height, width} = props;

        useEffect(() => {
            if (containerRef) {
                containerRef.style.width = `${width}px`;
                containerRef.style.height = `${height}px`;
                map.invalidateSize();
            }
        }, [containerRef, height, map, width]);

        return null;
    }

    return (
        <div className='map-main-container'>
            <MapContainer className='map-container' center={position} zoom={currentZoom} scrollWheelZoom={true} style={styles.mapContainer} zoomControl={false} attributionControl={false}>
                <TileLayer url={osm.maptiler.url} />
                <ChangeView zoom={12} />
                <Marker position={position}>
                    <Popup>
                        <p>{weatherInfos.name}</p>
                        <p>{weatherInfos.main.temp} °C</p>
                    </Popup>
                </Marker>
                <SetViewOnClick animateRef={animateRef} />
                {/* Add the useEffect hook to update the map size */}
                {props.height && props.width && (
                    <UseEffectToUpdateMapSize height={props.height} width={props.width} />
                )}
            </MapContainer>
        </div>
    );
}

export default WeatherMap;
