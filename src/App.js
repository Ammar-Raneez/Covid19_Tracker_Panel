import React, { useState, useEffect } from 'react';
import {FormControl, Select, MenuItem, Card, CardContent} from '@material-ui/core';
import './App.css';
import InfoBox from './InfoBox';	
import Map from './Map';
import Table from './Table';
import {sortData, prettyPrintStat} from './util';
import LineGraph from './LineGraph';
import "leaflet/dist/leaflet.css";

function App() {
	const [countries, setCountries] = useState([]);
	const [country, setCountry] = useState("Worldwide");
	const [countryInfo, setCountryInfo] = useState({});

	//for table
	const [tableData, setTableData] = useState([]);

	//for leaflet map
	const [mapCenter, setMapCenter] = useState({lat: 34.80746, lng: -40.4796});
	const [mapZoom, setMapZoom] = useState(3);
	const [mapCountries, setMapCountries] = useState([]);
	//for different circle coloring, based on cases type, cases set to default cuz thats the first we wanna look at
	const [casesType, setCasesType] = useState("cases");

	//effect that handles the initial display of worldwide data, since this runs whenever page loads this data is initally displayed
	useEffect(() => {
		fetch("https://disease.sh/v3/covid-19/all")
			.then(response => response.json())
			.then(data => setCountryInfo(data))
	}, [])


	useEffect(() => {
		//asynchronouse js - sending api request to get data of all 255 countries, only name and iso, to display the menu items list
		const getCountriesData = async () => {
			await fetch("https://disease.sh/v3/covid-19/countries")
				.then(response => response.json())
				.then(data => {
					//map through the json data, and add the name and value of the country to countries
					const countries = data.map(country => (
						{name: country.country, value: country.countryInfo.iso2}
					))	//United States/ United Kingdom, USA/UK

					setCountries(countries);

					const sortedData = sortData(data);
					setTableData(sortedData);		//here we pass the entire json data, for our Table component

					setMapCountries(data);
				});
		};
		//how we handle async function calls inside of an useEffect
		getCountriesData();
	}, [])


	//function that handles fetching the covid data of each country - but does not handle the initial load of the default worldwide data
	const onCountryChange = async event => {
		//gets selected value
		const countryCode = event.target.value;
		setCountry(countryCode);

		//fetch data for each value selected, cuz the urls are different, need to condition it
		const fetchUrl = countryCode === 'Worldwide' ? "https://disease.sh/v3/covid-19/all" : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

		await fetch(fetchUrl)
			.then(response => response.json())
			.then(data => {
				setCountry(countryCode);

				//whole data for chosen country
				setCountryInfo(data);
				console.log(data);

				//set center of map to current clicked countries lat and lng
				setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
				setMapZoom(4);
			})
	}


	return (
		<div className="app">
			<div className="app__left">
				{/*header*/}
				{/*title + select input dropdown field*/}
				<div className="app__header">
					<h1>COVID-19 TRACKER</h1>
					<FormControl className="app__dropdown">
						<Select variant="outlined" value={country} onChange={onCountryChange}>
							<MenuItem value="Worldwide">Worldwide</MenuItem>
							{/*loop through all the countries and display them as menu items*/}
							{countries.map(country => <MenuItem value={country.value}>{country.name}</MenuItem>)}
						</Select>
					</FormControl>
				</div>

				{/*info boxes, the fields used are what are specified on the fetched data*/}
				<div className="app__stats">
					<InfoBox isRed active={casesType === 'cases'} onClick={e => setCasesType("cases")} title="Coronavirus cases" cases={prettyPrintStat(countryInfo.todayCases)} total={prettyPrintStat(countryInfo.cases)} />
					<InfoBox isGreen active={casesType === 'recovered'} onClick={e => setCasesType("recovered")} title="Recovered" cases={prettyPrintStat(countryInfo.todayRecovered)} total={prettyPrintStat(countryInfo.recovered)} />
					<InfoBox isBlack active={casesType === 'deaths'} onClick={e => setCasesType("deaths")} title="Deaths" cases={prettyPrintStat(countryInfo.todayDeaths)} total={prettyPrintStat(countryInfo.deaths)} />
				</div>

				{/*map*/}
				<Map casesType={casesType} countries={mapCountries} center={mapCenter} zoom={mapZoom}/>
			</div>

			<Card className="app__right">
				{/*table, graph*/}
				<CardContent>
					<h3>Live Cases by Country</h3>
					<Table countries={tableData} />
					<h3 className="app__graphTitle">Worldwide new {casesType}</h3>
					<LineGraph className="app__graph" casesType={casesType} />
				</CardContent>
			</Card>
		</div>
	);
}

export default App;
