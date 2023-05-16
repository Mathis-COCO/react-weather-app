import {React, useState, useEffect} from 'react';
import WeatherMap from '../components/Map';
import Navbar from '../components/Navbar';
import WeatherBar from '../components/WeatherBar';
import '../css/FullMap.scss';

function Homepage() {
	const [windowSize, setWindowSize] = useState({
		width: window.innerWidth,
		height: window.innerHeight,
	});

	useEffect(() => {
		const handleResize = () => {
			setWindowSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		};

		window.addEventListener('resize', handleResize);

		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return (
		<div className='full-map-container'>
			<div className='weatherbar-container'>
				<WeatherBar />
			</div>
			<Navbar />
			<div className='fullmap-container'>
				<WeatherMap
					height={windowSize.height - 56}
					width={windowSize.width}
					zoom={12}
				/>
			</div>
		</div>
	);
}

export default Homepage;
