/* eslint-disable indent */
import React from 'react';
import {Routes, BrowserRouter as Router, Route} from 'react-router-dom';
import Fullmap from './pages/Fullmap.jsx';
import Homepage from './pages/Homepage.jsx';

function App() {
  return (
      <Router>
        <Routes>
          <Route path='/' element={<Homepage />}/>
          <Route path='/map' element={<Fullmap />}/>
        </Routes>
      </Router>
  );
}

export default App;
