/* eslint-disable no-unused-vars */
/* eslint-disable capitalized-comments */
/* eslint-disable react/prop-types */
/* eslint-disable arrow-parens */
/* eslint-disable indent */
import React, {useRef, useState} from 'react';
import {MapContainer, Marker, Popup, TileLayer, useMap, useMapEvent, useMapEvents} from 'react-leaflet';
import osm from '../providers/osm-providers';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
// const [markerPosition, setMarkerPosition] = useState();

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

function SetViewOnClick({animateRef}) {
    const map = useMapEvent('click', (e) => {
        map.setView(e.latlng, map.getZoom(), {
            animate: animateRef.current || true,
        });
        console.log(e.latlng);
        // setMarkerPosition(e.latlng);
    });

    return null;
}

function WeatherMap(props) {
    const animateRef = useRef(false);
    const mapRef = useRef();
    const {lat, lon, height, width, temp, city} = props;
    const position = [lat, lon];
    const styles = {
        mapContainer: {
            height,
            width,
        },
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
                {/* { markerPosition && (
                <Marker
                position={[markerPosition.latitude, markerPosition.longitude]}
                ref={mapRef}
                >
                    <Popup>
                    aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                    aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                    aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                    </Popup>
                </Marker>
                )} */}
                <SetViewOnClick animateRef={animateRef} />
            </MapContainer>
        </div>

    );
}

export default WeatherMap;
