import React, { useState, useEffect } from 'react';
import {FormControl, Select, MenuItem, Card, CardContent} from '@material-ui/core';
import './App.css';
import InfoBox from './InfoBox';	
import Map from './Map';
import Table from './Table';
import {sortData} from './util';
import LineGraph from './LineGraph';

function App() {
	const [countries, setCountries] = useState([]);
	const [country, setCountry] = useState("Worldwide");
	const [countryInfo, setCountryInfo] = useState({});
	const [tableData, setTableData] = useState([]);


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
					))

					setCountries(countries);

					const sortedData = sortData(data);
					setTableData(sortedData);		//here we pass the entire json data, for our Table component
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
			})
	}
	console.log(countryInfo);


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
					<InfoBox title="Coronavirus cases" cases={countryInfo.todayCases} total={countryInfo.cases} />
					<InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
					<InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
				</div>

				{/*map*/}
				<Map/>
			</div>

			<Card className="app__right">
				{/*table, graph*/}
				<CardContent>
					<h3>Live Cases by Country</h3>
					<Table countries={tableData} />
					<h3>Worldwide new cases</h3>
					<LineGraph />
				</CardContent>
			</Card>
		</div>
	);
}

export default App;
