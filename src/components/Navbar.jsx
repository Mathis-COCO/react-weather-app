/* eslint-disable capitalized-comments */
/* eslint-disable react/prop-types */
/* eslint-disable arrow-parens */
/* eslint-disable indent */
import React from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import '../css/Navbar.scss';
import siteLogo from '../img/icon2.png';

function Navbar() {
    const location = useLocation();

    const styles = {background: location.pathname === '/' ? 'rgba(89, 89, 89, 0.459)' : 'rgb(79, 173, 255)'};

    const navigate = useNavigate();
    const handleClick = () => navigate('/');

    return (
        <div className='navbar-c-main' style={styles}>
            <div className='inline'>
                <div className='inline navbar-left' onClick={handleClick}>
                    <div className='navbar-c-logo'>
                        <img src={siteLogo} alt='weather-logo' className='navbar-logo' />
                    </div>
                    <p className='navbar-title'>Weather App</p>
                </div>
                <div className='inline navbar-right'>
                    <p>AFFICHER TEMP</p>
                    <p>AFFICHER VILLE UTILISATEUR</p>
                </div>
            </div>

        </div>
  );
}

export default Navbar;
