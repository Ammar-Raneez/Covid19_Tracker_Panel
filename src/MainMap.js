import React from 'react';
import './Map.css';
import MainMapUtils from './MainMapUtils';

function MainMap() {
    return (
        <div>
            <div id="map">{<MainMapUtils/>}</div>
        </div>
    )
}

export default MainMap
