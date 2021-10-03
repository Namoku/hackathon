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
		if (aux = document.getElementById("formulario")) {
			document.getElementById("inputLocation").value = locationCityState.city.toUpperCase() + ", " + locationCityState.state.toUpperCase();
		}
	}) .catch(e => { console.log(e);
		})
}

if (boton = document.getElementById("boton")) {
	checkInput = document.getElementsByClassName("form-check-input");
	boton.addEventListener("click", event => {
		event.preventDefault();
		if (document.getElementById("inputAge").value != "" && document.getElementById("selectSex").value != "Select" && document.getElementById("inputLocation").value != "") {
			formulario = {};

			formulario.inputAge = parseInt(document.getElementById("inputAge").value);
			formulario.selectSex = parseInt(document.getElementById("selectSex").value);
			formulario.inputLocation = document.getElementById("inputLocation").value;
			(checkInput[0].checked) ? formulario.checkPregnant = 1 : formulario.checkPregnant = 2;
			(checkInput[1].checked) ? formulario.hipertension = 1 : formulario.hipertension = 2;
			(checkInput[2].checked) ? formulario.diabetes = 1 : formulario.diabetes = 2;
			(checkInput[3].checked) ? formulario.obesidad = 1 : formulario.obesidad = 2;
			(checkInput[4].checked) ? formulario.asma = 1 : formulario.asma = 2;
			if (localStorage.setItem("formulario", JSON.stringify(formulario))) {
				boton.innerText = "Listo";
				boton.className = "btn btn-success";
			}
		}
		else {
			boton.innerText = "Llena los datos";
			boton.className = "btn btn-danger";
		}
	})
	document.getElementById("selectSex").addEventListener("change", () => {
		if (document.getElementById("selectSex").value == "2") {
			checkInput[0].checked = false;
			checkInput[0].disabled = true;
		}
		else {
			checkInput[0].disabled = false;
			document.getElementById("selectSex").value = "1";
		}
	})
}

