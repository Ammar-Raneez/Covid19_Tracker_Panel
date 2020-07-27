import React from 'react';
import {Circle, Popup} from 'react-leaflet';
import numeral from 'numeral'


export const sortData = data => {
    const sortedData = [...data];

    //sorts data, descendingly
    sortedData.sort((a, b) => a.cases > b.cases? -1 : 1)

    return sortedData;
}


export const prettyPrintStat = stat => 
    stat? `+${numeral(stat).format("0.0a")}` : "No Cases Detected"


//object of colors, for the circles
const casesTypeColors = {
    cases: {
        hex: "#cc1034",
        multiplier: 800 //size of circles
    },
    recovered: {
        hex: "#7dd71d",
        multiplier: 1200
    },
    deaths: {
        hex: "#222",
        multiplier: 2000
    }
}


//draw circles on the map, with interactive tooltip
export const showDataOnMap = (data, casesType='cases') => {
    return (
        data.map(country => {
            return (
                <Circle center={[country.countryInfo.lat, country.countryInfo.long]} 
                    fillOpacity={0.4} color={casesTypeColors[casesType].hex}
                    fillColor={casesTypeColors[casesType].hex}
                    radius={Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier}
                >   
                
                {/*clicking a circle pop ups a tooltip*/}
                    <Popup>
                        <div className="info-container">
                            <div className="info-flag" style={{ backgroundImage: `url(${country.countryInfo.flag})` }}></div>
                            <div className="info-name">{country.country}</div>
                            <div className="info-confirmed">Cases {numeral(country.cases).format("0,0")}</div>
                            <div className="info-recovered">Recovered {numeral(country.recovered).format("0,0")}</div>
                            <div className="info-deaths">Deaths {numeral(country.deaths).format("0,0")}</div>
                        </div>
                    </Popup>
                </Circle>
            )
        })
    )
}