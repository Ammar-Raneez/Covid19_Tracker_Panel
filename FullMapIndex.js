var listItems = document.querySelector(".stores-list-container");
var search = document.querySelector(".search-container");
var menu = document.querySelector(".menu");
var closeBtn = document.querySelector(".close");
menu.addEventListener('click', openPopUp);
closeBtn.addEventListener('click', closePopUp);

function openPopUp() {
    listItems.style.display = "inline";
    listItems.style.transition = "2s ease";
    search.style.display = "inline";
    search.style.transition = "2s ease";
    menu.style.display = "none";
}

function closePopUp() {
    listItems.style.display = "none";
    listItems.style.transition = "2s ease";
    search.style.display = "none";
    search.style.transition = "2s ease";
    menu.style.display = "inline";
}

var map; var darkModeMap; var markers = []; var infoWindow; var nightModeMap; var aubergineModeMap;

function initMap() {
    infoWindow = new google.maps.InfoWindow();
    var center = {lat: 40.52, lng:34.34};

    aubergineModeMap = new google.maps.StyledMapType(
        [
            {
                "elementType": "geometry",
                "stylers": [
                {
                    "color": "#1d2c4d"
                }
                ]
            },
            {
                "elementType": "labels.text.fill",
                "stylers": [
                {
                    "color": "#8ec3b9"
                }
                ]
            },
            {
                "elementType": "labels.text.stroke",
                "stylers": [
                {
                    "color": "#1a3646"
                }
                ]
            },
            {
                "featureType": "administrative.country",
                "elementType": "geometry.stroke",
                "stylers": [
                {
                    "color": "#4b6878"
                }
                ]
            },
            {
                "featureType": "administrative.land_parcel",
                "elementType": "labels.text.fill",
                "stylers": [
                {
                    "color": "#64779e"
                }
                ]
            },
            {
                "featureType": "administrative.province",
                "elementType": "geometry.stroke",
                "stylers": [
                {
                    "color": "#4b6878"
                }
                ]
            },
            {
                "featureType": "landscape.man_made",
                "elementType": "geometry.stroke",
                "stylers": [
                {
                    "color": "#334e87"
                }
                ]
            },
            {
                "featureType": "landscape.natural",
                "elementType": "geometry",
                "stylers": [
                {
                    "color": "#023e58"
                }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [
                {
                    "color": "#283d6a"
                }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [
                {
                    "color": "#6f9ba5"
                }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text.stroke",
                "stylers": [
                {
                    "color": "#1d2c4d"
                }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry.fill",
                "stylers": [
                {
                    "color": "#023e58"
                }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "labels.text.fill",
                "stylers": [
                {
                    "color": "#3C7680"
                }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [
                {
                    "color": "#304a7d"
                }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.text.fill",
                "stylers": [
                {
                    "color": "#98a5be"
                }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.text.stroke",
                "stylers": [
                {
                    "color": "#1d2c4d"
                }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [
                {
                    "color": "#2c6675"
                }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [
                {
                    "color": "#255763"
                }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels.text.fill",
                "stylers": [
                {
                    "color": "#b0d5ce"
                }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels.text.stroke",
                "stylers": [
                {
                    "color": "#023e58"
                }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "labels.text.fill",
                "stylers": [
                {
                    "color": "#98a5be"
                }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "labels.text.stroke",
                "stylers": [
                {
                    "color": "#1d2c4d"
                }
                ]
            },
            {
                "featureType": "transit.line",
                "elementType": "geometry.fill",
                "stylers": [
                {
                    "color": "#283d6a"
                }
                ]
            },
            {
                "featureType": "transit.station",
                "elementType": "geometry",
                "stylers": [
                {
                    "color": "#3a4762"
                }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                {
                    "color": "#0e1626"
                }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [
                {
                    "color": "#4e6d70"
                }
                ]
            }
        ],
        {name: "Aubergine"}
    )

    nightModeMap = new google.maps.StyledMapType(
        [
            {
                "elementType": "geometry",
                "stylers": [
                {
                    "color": "#212121"
                }
                ]
            },
            {
                "elementType": "labels.icon",
                "stylers": [
                {
                    "visibility": "off"
                }
                ]
            },
            {
                "elementType": "labels.text.fill",
                "stylers": [
                {
                    "color": "#757575"
                }
                ]
            },
            {
                "elementType": "labels.text.stroke",
                "stylers": [
                {
                    "color": "#212121"
                }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry",
                "stylers": [
                {
                    "color": "#757575"
                }
                ]
            },
            {
                "featureType": "administrative.country",
                "elementType": "labels.text.fill",
                "stylers": [
                {
                    "color": "#9e9e9e"
                }
                ]
            },
            {
                "featureType": "administrative.land_parcel",
                "stylers": [
                {
                    "visibility": "off"
                }
                ]
            },
            {
                "featureType": "administrative.locality",
                "elementType": "labels.text.fill",
                "stylers": [
                {
                    "color": "#bdbdbd"
                }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [
                {
                    "color": "#757575"
                }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [
                {
                    "color": "#181818"
                }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "labels.text.fill",
                "stylers": [
                {
                    "color": "#616161"
                }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "labels.text.stroke",
                "stylers": [
                {
                    "color": "#1b1b1b"
                }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry.fill",
                "stylers": [
                {
                    "color": "#2c2c2c"
                }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.text.fill",
                "stylers": [
                {
                    "color": "#8a8a8a"
                }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [
                {
                    "color": "#373737"
                }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [
                {
                    "color": "#3c3c3c"
                }
                ]
            },
            {
                "featureType": "road.highway.controlled_access",
                "elementType": "geometry",
                "stylers": [
                {
                    "color": "#4e4e4e"
                }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "labels.text.fill",
                "stylers": [
                {
                    "color": "#616161"
                }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "labels.text.fill",
                "stylers": [
                {
                    "color": "#757575"
                }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                {
                    "color": "#000000"
                }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [
                {
                    "color": "#3d3d3d"
                }
                ]
            }
        ],
        {name: "Dark Mode"}
    )

    darkModeMap = new google.maps.StyledMapType(
        [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
                featureType: 'administrative.locality',
                elementType: 'labels.text.fill',
                stylers: [{color: '#d59563'}]
            },
            {
                featureType: 'poi',
                elementType: 'labels.text.fill',
                stylers: [{color: '#d59563'}]
            },
            {
                featureType: 'poi.park',
                elementType: 'geometry',
                stylers: [{color: '#263c3f'}]
            },
            {
                featureType: 'poi.park',
                elementType: 'labels.text.fill',
                stylers: [{color: '#6b9a76'}]
            },
            {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [{color: '#38414e'}]
            },
            {
                featureType: 'road',
                elementType: 'geometry.stroke',
                stylers: [{color: '#212a37'}]
            },
            {
                featureType: 'road',
                elementType: 'labels.text.fill',
                stylers: [{color: '#9ca5b3'}]
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry',
                stylers: [{color: '#746855'}]
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry.stroke',
                stylers: [{color: '#1f2835'}]
            },
            {
                featureType: 'road.highway',
                elementType: 'labels.text.fill',
                stylers: [{color: '#f3d19c'}]
            },
            {
                featureType: 'transit',
                elementType: 'geometry',
                stylers: [{color: '#2f3948'}]
            },
            {
                featureType: 'transit.station',
                elementType: 'labels.text.fill',
                stylers: [{color: '#d59563'}]
            },
            {
                featureType: 'water',
                elementType: 'geometry',
                stylers: [{color: '#17263c'}]
            },
            {
                featureType: 'water',
                elementType: 'labels.text.fill',
                stylers: [{color: '#515c6d'}]
            },
            {
                featureType: 'water',
                elementType: 'labels.text.stroke',
                stylers: [{color: '#17263c'}]
            }
        ],
        {name: 'Night Mode'}
    );

    map = new google.maps.Map(document.getElementById('map'), {
        center: center,
        zoom: 1,
        mapTypeId: 'roadmap',
        mapTypeControlOptions: {mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
        'styled_map', 'styled_map_two', 'styled_map_three']},
    });

    map.mapTypes.set('styled_map_three', aubergineModeMap);
    map.setMapTypeId('styled_map_three');
    map.mapTypes.set('styled_map_two', nightModeMap);
    map.setMapTypeId('styled_map_two');
    map.mapTypes.set('styled_map', darkModeMap);
    map.setMapTypeId('styled_map');
    searchCountries();
    showStoresMarkers();
    setOnClickListener();
}

//this function is for the click listener - upon clicking a list item navigation to particular country
function setOnClickListener(){
    var storeElements = document.querySelectorAll(".store-container");
    storeElements.forEach(function(elem, index){
        elem.addEventListener('click', function(){
            google.maps.event.trigger(markers[index], 'click')
        })
    })
}

export function searchCountries(){
    let arr = [];
    var foundCountries = [];
    var countryInput = document.getElementById('country-input').value;
    fetch('https://corona.lmao.ninja/v2/countries')
    .then(response => response.json())
    .then(data=> {
        arr.push(data);
        return arr;
    })
    .then((arr)=>{
        if(countryInput){
            for(var i=0;i<arr.length;i++){
                for(var j=0;j<arr[i].length;j++){
                    var countryFirstThree = arr[i][j].countryInfo["iso3"];
                    if (countryFirstThree==countryInput){
                        foundCountries.push(arr[i][j]);
                    }
                }
            }
        } else {
            foundCountries = arr;
        }
        clearLocations();
        displayStores(foundCountries);
    })
}

function clearLocations(){
    infoWindow.close();
    for(let i=0;i<markers.length;i++){
        markers[i].setMap(null);
    }
    markers.length = 0;
}


function displayStores(foundCountries) {     
    var countryHtml = "";
    let arr = [];
    fetch('https://corona.lmao.ninja/v2/countries')
    .then(response => response.json())
    .then(data=> {
        arr.push(data);
        return arr;
    })
    .then((arr)=>{
        if(foundCountries[0].length==215){
            for(let i=0;i<arr.length;i++){
                for(let j=0;j<arr[i].length;j++){
                    var name = arr[i][j].country;
                    var cases = arr[i][j].cases;
                    var iso = arr[i][j].countryInfo["iso3"]
                    countryHtml += `            
                        <div class="store-container">
                            <div class="store-info-container">
                                <div class="store-address">
                                    <span>${name}</span>
                                    <span>Total cases - ${cases}</span>         
                                </div>
                                <div class="store-phone-number"><i class="fa fa-cog"></i><em>ISO3</em> - ${iso}</div>
                            </div>
                            <div class="store-number-container">
                                <div class="store-number">
                                    ${j+1}
                                </div>
                            </div>
                        </div>
                    `
                }
            }
        } else {
            for(let i=0;i<foundCountries.length;i++){
                var name = foundCountries[i].country;
                var cases = foundCountries[i].cases;
                var iso = foundCountries[i].countryInfo["iso3"]
                countryHtml += `            
                    <div class="store-container">
                        <div class="store-info-container">
                            <div class="store-address">
                                <span>${name}</span>
                                <span>Total cases - ${cases}</span>         
                            </div>
                            <div class="store-phone-number"><i class="fa fa-cog"></i><em>ISO3</em> - ${iso}</div>
                        </div>
                        <div class="store-number-container">
                            <div class="store-number">
                                ${i+1}
                            </div>
                        </div>
                    </div>
                `
            }
        }
        document.querySelector('.stores-list').innerHTML = countryHtml;
        showStoresMarkers(foundCountries);
        setOnClickListener();
    });
}


function showStoresMarkers(foundCountries) {
    var bounds = new google.maps.LatLngBounds();
    let arr = [];
    fetch('https://corona.lmao.ninja/v2/countries')
    .then(response => response.json())
    .then(data=> {
        arr.push(data);
        return arr;
    })
    .then((arr)=>{
        if(foundCountries[0].length==215){
            for(let i=0;i<arr.length;i++){
                for(let j=0;j<arr[i].length;j++){
                    var latlng = new google.maps.LatLng(
                            arr[i][j].countryInfo.lat,          //directions link emergency and other extras TODO
                            arr[i][j].countryInfo.long
                        );
                    var name = arr[i][j].country;
                    var cases = arr[i][j].cases;
                    var active = arr[i][j].active;
                    var recovered = arr[i][j].recovered;
                    var death = arr[i][j].deaths;
                    var population  = arr[i][j].population;
                    var continent = arr[i][j].continent;
                    var critical = arr[i][j].critical;
                    var todayCases = arr[i][j].todayCases;
                    var todayDeaths = arr[i][j].todayDeaths;
                    var todayRecovered = arr[i][j].todayRecovered;
                    var flagSrc = arr[i][j].countryInfo.flag;
                    bounds.extend(latlng);
                    createMarker(latlng, name, cases, active, recovered, death, population, continent, critical, todayCases, todayDeaths, todayRecovered, flagSrc);
                }
            }
        } else {
            for(let i=0;i<foundCountries.length;i++){
                var latlng = new google.maps.LatLng(
                    foundCountries[i].countryInfo.lat,          
                    foundCountries[i].countryInfo.long
                );
            var name = foundCountries[i].country;
            var cases = foundCountries[i].cases;
            var active = foundCountries[i].active;
            var recovered = foundCountries[i].recovered;
            var death = foundCountries[i].deaths;
            var population  = foundCountries[i].population;
            var continent = foundCountries[i].continent;
            var critical = foundCountries[i].critical;
            var todayCases = foundCountries[i].todayCases;
            var todayDeaths = foundCountries[i].todayDeaths;
            var todayRecovered = foundCountries[i].todayRecovered;
            var flagSrc = foundCountries[i].countryInfo.flag;
            bounds.extend(latlng);
            createMarker(latlng, name, cases, active, recovered, death, population, continent, critical, todayCases, todayDeaths, todayRecovered, flagSrc);
            }
        }
    });


    map.fitBounds(bounds);
}

function createMarker(latlng, name, cases, active, recovered, death, population, continent, critical, todayCases, todayDeaths, todayRecovered, flagSrc) {  
    var html = "<div class='msg'><span class='mainCn countryName'><b>" + name + "</b></span></div>" + "<div class='msg'><div class='sec'>" +  "Continent <b>" + continent + "</b><br/>" +
    "Population <b>" + population + "</b><br/>" +
    "Total <b>" + cases + "</b><br/>" + "Active <b>" + active + "</b><br/>" + "Recovered <b>" + recovered + "</b><br/>" + 
    "Deaths <b>" + death + "</b></div>" + 
    "<div class='sec'>Critical <b>" + critical + "</b><br/>" + "Cases Today <b>" + todayCases + "</b><br/>" + "Deaths Today <b>" + todayDeaths + "</b><br/>" +
    "Recoveries Today <b>" + todayRecovered + "</b><br/></div></div>";

    var hoverHtml = "<div class='msgHover'><span class='countryName'><b>" + name + "</b></span>" +  "Total <b>" + cases + "</b><br/>" + 
    "Active <b>" + active + "</b><br/>" + "Recovered <b>" + recovered + "</b><br/>" + "Deaths<b>" + death + "</b></div>";

    var marker = new google.maps.Marker({
        position: latlng,
        map: map,
    });
    google.maps.event.addListener(marker, 'click', () => {
        infoWindow.setContent(html);
        infoWindow.open(map, marker);
    });
    google.maps.event.addListener(marker, 'mouseover', () => {
        infoWindow.setContent(hoverHtml);
        infoWindow.open(map, marker);
    })
    markers.push(marker);
}