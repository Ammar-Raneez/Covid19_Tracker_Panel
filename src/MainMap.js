import React from 'react';
import './MainMap.css';
import {searchCountries} from './MainMapUtils';

function MainMap() {
    return (
        <div>
            <div className="pop-up">
                <div className="search-container">
                    <div className="search">
                        <input id="country-input" type="text" placeholder="Enter Country's ISO3 In CAPS..."/>
                        <i onClick={searchCountries} id="search-icon" className="fas fa-search"></i>
                    </div>
                </div>

                <div className="stores-list-container">
                    <div className="stores-list">
                    </div>
                </div>
            </div>
            
            <span><i className="menu fas fa-bars"></i><i className="close fas fa-times"></i></span>
            <div id="map"></div>
        </div>
    )
}

export default MainMap
