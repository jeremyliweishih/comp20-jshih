var map;
var lat = 0;
var long = 0;

var whereIAm = new google.maps.LatLng(lat, long);
var options = {
    zoom: 10, // The larger the zoom number, the bigger the zoom
    center: whereIAm,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };


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
}