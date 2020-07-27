import React, { Component } from 'react';
import {Button, Link} from '@material-ui/core'
import './MainMap.css';
import {Map, GoogleApiWrapper, Marker, InfoWindow} from 'google-maps-react';
import numeral from 'numeral';

const mapStyles = {
    width: '100%',
    height: '100%'
}

export class MainMapUtils extends Component {
    constructor(props) {
        super(props)

        this.state = {
            activeMarker: {},
            selectedPlace: {},
            allData: [],
            chosenCountry: {},
            showingInfoWindow: false
        }

        this.displayMarkers = this.displayMarkers.bind(this);
        this.onMarkerClick = this.onMarkerClick.bind(this);
    }

    componentWillMount = async () => {
        await fetch('https://corona.lmao.ninja/v2/countries')
            .then(response => response.json())
            .then(data => {
                this.setState({allData: data});
            })
    }

    onMarkerClick(props, marker) {
        this.setState({chosenCountry : this.state.allData.filter(eachCountry => eachCountry.country === marker.name)[0]})
        this.setState({
            activeMarker: marker,
            selectedPlace: props,
            showingInfoWindow: true
        });
    }

    displayMarkers() { 
        const markers = this.state.allData.map((country, index) => {
            const latitude = country.countryInfo.lat;
            const longitude = country.countryInfo.long;

        return (
            <Marker name={country.country} key={index} id={index} position={{lat: latitude, lng: longitude}} onClick={this.onMarkerClick}/>
            )
        })
        return markers
    }

    render() {
        let flagUrl = '';
        try {
            flagUrl = this.state.chosenCountry.countryInfo.flag;
        } catch (error) {
            
        }
        return (
            <Map google={this.props.google} zoom={4} style={mapStyles} initialCenter={{lat: 34.80746, lng: -40.4796}}>
                <Button><Link color="secondary" href="/">&lt;&lt;&lt; Back to Panel </Link></Button>
                {this.displayMarkers()}

                <InfoWindow marker={this.state.activeMarker} onClose={this.onInfoWindowClose} visible={this.state.showingInfoWindow}>
                    <div>
                        <h1>{this.state.selectedPlace.name}</h1>
                    </div>   
                    <div className="info-container">
                            <div className="info-flag" style={{ backgroundImage: `url(${flagUrl})`, backgroundSize: 'cover' }}></div>
                            
                            <div className="inner-container">
                                <div className="info-innerContainer">
                                    <div className="info-population"><div>Population</div> <div><strong>{numeral(this.state.chosenCountry.population).format("0,0")}</strong></div></div>
                                    <div className="info-confirmed"><div>Total Cases</div> <div><strong>{numeral(this.state.chosenCountry.cases).format("0,0")}</strong></div></div>
                                    <div className="info-today"><div>Today Cases</div> <div><strong>{numeral(this.state.chosenCountry.todayCases).format("0,0")}</strong></div></div>
                                    <div className="info-active"><div>Active Cases</div> <div><strong>{numeral(this.state.chosenCountry.active).format("0,0")}</strong></div></div>
                                    <div className="info-critical"><div>Critical Cases</div> <div><strong>{numeral(this.state.chosenCountry.critical).format("0,0")}</strong></div></div>
                                </div>

                                <div className="info-innerContainer">
                                    <div className="info-today"><div>Today Recovered</div> <div><strong>{numeral(this.state.chosenCountry.todayRecovered).format("0,0")}</strong></div></div>
                                    <div className="info-recovered"><div>Total Recovered</div> <div><strong>{numeral(this.state.chosenCountry.recovered).format("0,0")}</strong></div></div>
                                    <div className="info-today"><div>Today Deaths</div> <div><strong>{numeral(this.state.chosenCountry.todayDeaths).format("0,0")}</strong></div></div>
                                    <div className="info-deaths"><div>Total Deaths</div> <div><strong>{numeral(this.state.chosenCountry.deaths).format("0,0")}</strong></div></div>
                                </div>
                            </div>
                    </div>
                </InfoWindow>
            </Map>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyCc2kqz_NBpNKhMvPEAQIiHgy1tegwhfEo'
})(MainMapUtils)
