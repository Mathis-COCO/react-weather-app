/* eslint-disable indent */
import React from 'react';
import {Routes, BrowserRouter as Router, Route} from 'react-router-dom';
import Homepage from './pages/Homepage.jsx';
import WeatherProvider from './providers/weather-provider.js';
import OldSite from './pages/OldSite.jsx';

function App() {
  return (
    <WeatherProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Homepage />}/>
          <Route path='/old-site' element={<OldSite />}/>
          <Route path='/map' element={<Homepage />}/>
        </Routes>
      </Router>
    </WeatherProvider>
  );
}

export default App;
