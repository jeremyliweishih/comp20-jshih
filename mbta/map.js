var map;
var lat = 0;
var long = 0;
var stops = [
	    {lat: 42.395428, lng: -71.142483},
	    {lat: 42.39674, lng: -71.121815},
	    {lat: 42.3884, lng:-71.11914899999999},
	    {lat: 42.373362, lng: -71.118956},
		{lat: 42.365486, lng: -71.103802},
	    {lat: 42.36249079, lng: -71.08617653},
	    {lat: 42.361166, lng:  -71.070628},
	    {lat: 42.35639457, lng: -71.0624242},
	    {lat: 42.355518, lng: -71.060225},
	    {lat: 42.352271, lng: -71.05524200000001},
	    {lat: 42.342622, lng: -71.056967},
	    {lat: 42.330154, lng: -71.057655},
	    {lat: 42.320685, lng: -71.052391},
	    {lat: 42.275275, lng: -71.029583},
	    {lat: 42.2665139, lng: -71.0203369},
	    {lat: 42.251809, lng: -71.005409},
	    {lat: 42.233391, lng: -71.007153},
	    {lat: 42.2078543, lng: -71.0011385},
	   	{lat: 42.320685, lng: -71.052391},
	    {lat: 42.31129, lng: -71.053331},
	    {lat: 42.300093, lng: -71.061667},
	    {lat: 42.29312583, lng: -71.06573796000001},
	    {lat: 42.284652, lng: -71.06448899999999}
	];

var whereIAm = new google.maps.LatLng(lat, long);
var options = {
    zoom: 15, // The larger the zoom number, the bigger the zoom
    center: whereIAm,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

var infowindow = new google.maps.InfoWindow();

var schedule = {
	"South Station": [],
	"Andrew": [],
	"Harvard Square": [],
	"JFK/UMass": [],
	"Savin Hill": [],
	"Broadway": [],
	"North Quincy": [],
	"Shawmut": [],
	"Davis": [],
	"Alewife": [],
	"Kendall/MIT": [],
	"Charles/MGH": [],
	"Downtown Crossing": [],
	"Quincy Center": [],
	"Quincy Adams": [],
	"Ashmont": [],
	"Wollaston": [],
	"Fields Corner": [],
	"Central Square": [],
	"Braintree": [],
	"Park Street": [],
	"Porter Square": []
}

function init()
{
	map = new google.maps.Map(document.getElementById("map_canvas"), options);

	get_location();
}

function get_location()
{
	if (navigator.geolocation) {
	  navigator.geolocation.getCurrentPosition(function(position) {
	    lat = position.coords.latitude;
	    long = position.coords.longitude;
	    renderMap();
	  });
	}

	else {
	  alert("Sorry! Geolocation is not supported by your web browser.");
	}
}

function renderMap()
{
	whereIAm = new google.maps.LatLng(lat, long);
	map.panTo(whereIAm);

	marker = new google.maps.Marker( {
		position: whereIAm,
		title: "Your Position"
	});

    marker.addListener('click', function() {
    	addClosestStop();
    });
	marker.setMap(map);

	google.maps.event.addListener(marker, 'click', function() {
		infowindow.setContent(marker.title);
		infowindow.open(map, marker);
	});

	add_stops();
	addRedLine();
	loadSchedule();
}

function addMarker(stop) {
  var marker = new google.maps.Marker({
    position: stop.position,
    icon: 'subway.png',
    title: stop.title,
    map: map
  });

  	google.maps.event.addListener(marker, 'click', function() {
		infowindow.setContent(marker.title);
		infowindow.open(map, marker);
	});
}

function add_stops()
{
	var stops = [
		{
		position: new google.maps.LatLng(42.352271, -71.05524200000001),
		title: "South Station"
		}, {
		position: new google.maps.LatLng(42.330154,  -71.057655),
		title: 'Andrew'
		}, {
		position: new google.maps.LatLng(42.3884, -71.11914899999999),
		title: 'Porter Square'
		}, {
		position: new google.maps.LatLng(42.373362, -71.118956),
		title: 'Harvard Square'
		}, {
		position: new google.maps.LatLng(42.320685, -71.052391),
		title: 'JFK/UMass'
		}, {
		position: new google.maps.LatLng(42.31129, -71.053331),
		title: 'Savin Hill'
		}, {
		position: new google.maps.LatLng(42.35639457, -71.0624242),
		title: 'Park Street'
		}, {
		position: new google.maps.LatLng(42.342622, -71.056967),
		title: 'Broadway'
		}, {
		position: new google.maps.LatLng(42.275275, -71.029583),
		title: 'North Quincy'
		}, {
		position: new google.maps.LatLng(42.29312583, -71.06573796000001),
		title: 'Shawmut'
		}, {
		position: new google.maps.LatLng(42.39674, -71.121815),
		title: 'Davis'
		}, {
		position: new google.maps.LatLng(42.395428, -71.142483),
		title: 'Alewife'
		}, {
		position: new google.maps.LatLng(42.36249079, -71.08617653),
		title: 'Kendall/MIT'
		}, {
		position: new google.maps.LatLng(42.361166, -71.070628),
		title: 'Charles/MGH'
		}, {
		position: new google.maps.LatLng(42.355518, -71.060225),
		title: 'Downtown Crossing'
		}, {
		position: new google.maps.LatLng(42.251809, -71.005409),
		title: 'Quincy Center'
		}, {
		position: new google.maps.LatLng(42.233391, -71.007153),
		title: 'Quincy Adams'
		}, {
		position: new google.maps.LatLng(42.284652 , -71.06448899999999),
		title: 'Ashmont'
		}, {
		position: new google.maps.LatLng(42.2665139, -71.0203369),
		title: 'Wollaston'
		}, {
		position: new google.maps.LatLng(42.300093, -71.061667),
		title: 'Fields Corner'
		}, {
		position: new google.maps.LatLng(42.365486, -71.103802),
		title: 'Central Square'
		}, {
		position: new google.maps.LatLng(42.2078543, -71.0011385),
		title: 'Braintree'
		}
	];

	for (var i = 0, stop; stop = stops[i]; i++) {
          addMarker(stop);
        }

}

function addRedLine(){

	var stops = [
	    {lat: 42.395428, lng: -71.142483},
	    {lat: 42.39674, lng: -71.121815},
	    {lat: 42.3884, lng:-71.11914899999999},
	    {lat: 42.373362, lng: -71.118956},
		{lat: 42.365486, lng: -71.103802},
	    {lat: 42.36249079, lng: -71.08617653},
	    {lat: 42.361166, lng:  -71.070628},
	    {lat: 42.35639457, lng: -71.0624242},
	    {lat: 42.355518, lng: -71.060225},
	    {lat: 42.352271, lng: -71.05524200000001},
	    {lat: 42.342622, lng: -71.056967},
	    {lat: 42.330154, lng: -71.057655},
	    {lat: 42.320685, lng: -71.052391},
	    {lat: 42.275275, lng: -71.029583},
	    {lat: 42.2665139, lng: -71.0203369},
	    {lat: 42.251809, lng: -71.005409},
	    {lat: 42.233391, lng: -71.007153},
	    {lat: 42.2078543, lng: -71.0011385}
	]

	var split = [
	    {lat: 42.320685, lng: -71.052391},
	    {lat: 42.31129, lng: -71.053331},
	    {lat: 42.300093, lng: -71.061667},
	    {lat: 42.29312583, lng: -71.06573796000001},
	    {lat: 42.284652, lng: -71.06448899999999}
	]

	var redLine = new google.maps.Polyline({
	    path: stops,
	    geodesic: true,
	    strokeColor: '#FF0000',
	    strokeOpacity: 1.0,
	    strokeWeight: 2
	 });

	var redLineSplit = new google.maps.Polyline({
	    path: split,
	    geodesic: true,
	    strokeColor: '#FF0000',
	    strokeOpacity: 1.0,
	    strokeWeight: 2
	 });

	redLine.setMap(map);
	redLineSplit.setMap(map);
}

//utilized haversine from stack overflow
function closestStop(){
 	var distance = stops.map(function(elem){
 		lat1 = lat;
 		lon1 = long;
 		lat2 = elem.lat;
 		lon2 = elem.lng;

	 	Number.prototype.toRad = function() {
		   return this * Math.PI / 180;
		}

		var R = 6371; // km 
		//has a problem with the .toRad() method below.
		var x1 = lat2-lat1;
		var dLat = x1.toRad();  
		var x2 = lon2-lon1;
		var dLon = x2.toRad();  
		var a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
		                Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * 
		                Math.sin(dLon/2) * Math.sin(dLon/2);  
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
		var d = R * c;
		return d;
 	});

 	var min = distance[0];
 	var minIndex = 0;
 	for(var i = 0; i < distance.length; i++)
 	{
 		if(distance[i] < min){
 			min = distance[i];
 			minIndex = i;
 		}
 	}

 	return stops[minIndex];
}

function addClosestStop(){
	var closest_stop = closestStop();
	var coords = [
		{lat: lat, lng: long},
		{lat: closest_stop.lat, lng: closest_stop.lng}
	];


	var closest = new google.maps.Polyline({
	    path: coords,
	    geodesic: true,
	    strokeColor: '#0000FF',
	    strokeOpacity: 1.0,
	    strokeWeight: 2
	 });

	closest.setMap(map);
}


function loadSchedule() {
	request = new XMLHttpRequest();
	request.open("get", "https://rocky-taiga-26352.herokuapp.com/redline.json", true);
	request.onreadystatechange = funex;
	request.send();
}

function funex() {
	if (request.readyState == 4 && request.status == 200) {
		theData = request.responseText;
		messages = JSON.parse(theData);
		trips = messages.TripList.Trips;

		//populate schedule
		for(var i = 0; i < trips.length; i++){
			predictions = trips[i].Predictions;
			for(var j = 0; j < predictions.length; j++){
				stop = predictions[j].Stop;
				schedule[stop].push(predictions[j].Seconds);
				console.log(schedule[stop]);
				schedule[stop].sort(function(a, b){return a-b});
			}
		}

		console.log(schedule);
	}
}

