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
    const position = [lat, lon];
    const [markerPosition, setMarkerPosition] = useState();
    const [markerCity, setMarkerCity] = useState();
    const [markerTemp, setMarkerTemp] = useState();
    const APIKey = process.env.REACT_APP_WEATHER_NAV_API_KEY;
    const styles = {
        mapContainer: {
            height,
            width,
        },
    };

    function SetViewOnClick({animateRef}) {
        const map = useMapEvent('click', (e) => {
            map.setView(e.latlng, map.getZoom(), {
                animate: animateRef.current || true,
            });
            // const position = e.latlng;
            setMarkerPosition(e.latlng);
            getTemp(e.latlng);
        });
        return null;
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
                        <p>{city}</p>
                        <p>{temp} °C</p>
                    </Popup>
                </Marker>
                <SetViewOnClick animateRef={animateRef} />
                { markerPosition && (
                    <Marker position={[markerPosition.lat, markerPosition.lng]} ref={mapRef} >
                        <Popup>
                        <p>{markerCity}</p>
                        <p>{markerTemp} °C</p>
                        </Popup>
                    </Marker>
                )}
            </MapContainer>
        </div>

    );
}

export default WeatherMap;
