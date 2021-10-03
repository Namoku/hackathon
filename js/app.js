var locationCityState = {};
window.addEventListener("load", event => {
	getLocation()
})

function getLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition);
	} else {
		x.innerHTML = "Geolocation is not supported by this browser.";
	}
}

function showPosition(position) {
	fetch ("https://nominatim.openstreetmap.org/reverse.php?lat=" + position.coords.latitude + "&lon="+ position.coords.longitude +"&zoom=10&format=jsonv2")
	.then(response => response.json())
	.then(data => {
		locationCityState["city"] = data.address.city;
		locationCityState["state"] = data.address.state;
		if (formulario = document.getElementById("formulario")) {
			document.getElementById("inputLocation").value = locationCityState.city.toUpperCase() + ", " + locationCityState.state.toUpperCase();
		}
	})
		.catch(e => {
			console.log(e);
		})
}

