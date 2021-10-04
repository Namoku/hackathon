var locationCityState = {};
window.addEventListener("load", () => {
	getLocation();
})
function forShowData (auxJson, label) {
	var aux = 0;
	for (var i in auxJson)
		aux += parseInt(auxJson[i].TOTAL);
	label.innerText = aux;
	return aux;
}

function calcSex (auxJson) {
	var datas = {mujeres:0, hombres:0};
	for (var i in auxJson) {
		datas.hombres += parseInt(auxJson[i].Hombres);
		datas.mujeres += parseInt(auxJson[i].Mujeres);
	}
	return datas;
}
function getPercent (auxJson, dataJson, calcRiskJson) {
	if (auxJson.inputAge >= 0 && auxJson.inputAge <= 17) {
		if (auxJson.selectSex == 1)
			percent = parseInt(calcRiskJson[0].Mujeres) * 100 / parseInt(dataJson[0].Mujeres);
		else
			percent = parseInt(calcRiskJson[0].Hombres) * 100 / parseInt(dataJson[0].Hombres);
	}
	if (auxJson.inputAge >= 18 && auxJson.inputAge <= 29) {
		value1 = parseInt(calcRiskJson[1].Hombres)
		value2 = parseInt(dataJson[1].Hombres)
		if (auxJson.selectSex == 1)
			percent = parseInt(calcRiskJson[1].Hombres) * 100 / parseInt(dataJson[1].Mujeres);
		else
			percent = parseInt(calcRiskJson[1].Hombres) * 100 / parseInt(dataJson[1].Hombres);
	}
	if (auxJson.inputAge >= 30 && auxJson.inputAge <= 39) {
		if (auxJson.selectSex == 1)
			percent = parseInt(calcRiskJson[2].Hombres) * 100 / parseInt(dataJson[2].Mujeres);
		else
			percent = parseInt(calcRiskJson[2].Hombres) * 100 / parseInt(dataJson[2].Hombres);
	}
	if (auxJson.inputAge >= 40 && auxJson.inputAge <= 49) {
		if (auxJson.selectSex == 1)
			percent = parseInt(calcRiskJson[3].Hombres) * 100 / parseInt(dataJson[3].Mujeres);
		else
			percent = parseInt(calcRiskJson[3].Hombres) * 100 / parseInt(dataJson[3].Hombres);
	}
	if (auxJson.inputAge >= 50 && auxJson.inputAge <= 59) {
		if (auxJson.selectSex == 1)
			percent = parseInt(calcRiskJson[4].Hombres) * 100 / parseInt(dataJson[4].Mujeres);
		else
			percent = parseInt(calcRiskJson[4].Hombres) * 100 / parseInt(dataJson[4].Hombres);
	}
	if (auxJson.inputAge >= 60) {
		if (auxJson.selectSex == 1)
			percent = parseInt(calcRiskJson[5].Hombres) * 100 / parseInt(dataJson[5].Mujeres);
		else
			percent = parseInt(calcRiskJson[5].Hombres) * 100 / parseInt(dataJson[5].Hombres);
	}
	return percent;
}
function calcRisk (auxJson) {
	var dataJson = JSON.parse(localStorage.confirmedCases);
	var formData = new FormData();
	var percent = 0;
	var label = document.getElementsByClassName("mb-2 font-weight-bold text-danger font-size");
	var progressBars = document.getElementsByClassName("progress-bar progress-bar-striped progress-bar-animated");
	formData.append("entidad", locationCityState.state);
	formData.append("municipio", locationCityState.city);
	formData.append("obesidad", auxJson.obesidad);
	formData.append("hipertension", auxJson.hipertension);
	formData.append("asma", auxJson.asma);
	formData.append("diabetes", auxJson.diabetes);
	fetch("config/app.php?getFactorRisk", {
		method: 'POST',
		body: formData
	})
		.then(response => response.json())
		.then(data => {
			localStorage.calcRisk = JSON.stringify(data);
			percent = getPercent(auxJson, dataJson, data);
			label[0].innerHTML = "Risk factor: <span class=\"float-right\"> "+ percent.toFixed(2) + "%</span>";
			progressBars[0].style.width = percent.toFixed(2) + "%";
		})
		.catch(e => {
			console.log(e);
		})
	if (calcRiskJson = JSON.parse(localStorage.calcRisk)) {
		percent = getPercent(auxJson, dataJson, calcRiskJson);
		label[0].innerHTML = "Risk factor: <span class=\"float-right\"> "+ percent.toFixed(2) + "%</span>";
		progressBars[0].style.width = percent.toFixed(2) + "%";
	}
}

function showTopStates (auxJson) {
	labelProgressBars = document.getElementsByClassName("small font-weight-bold");
	progressBars = document.getElementsByClassName("progress-bar progress-bar-striped progress-bar-animated");
	progressBars[1].style.width = (auxJson[0].TOTAL * 100 / auxJson[0].TOTAL) + "%";
	progressBars[2].style.width = (auxJson[1].TOTAL * 100 / auxJson[0].TOTAL) + "%";
	progressBars[3].style.width = (auxJson[2].TOTAL * 100 / auxJson[0].TOTAL) + "%";
	progressBars[4].style.width = (auxJson[3].TOTAL * 100 / auxJson[0].TOTAL) + "%";
	progressBars[5].style.width = (auxJson[4].TOTAL * 100 / auxJson[0].TOTAL) + "%";
	labelProgressBars[0].innerText = auxJson[0].ENTIDAD;
	labelProgressBars[1].innerText = auxJson[1].ENTIDAD;
	labelProgressBars[2].innerText = auxJson[2].ENTIDAD;
	labelProgressBars[3].innerText = auxJson[3].ENTIDAD;
	labelProgressBars[4].innerText = auxJson[4].ENTIDAD;
}

function showData(values) {
	var formData = new FormData();
	// Check if exists cached data
	if (localStorage.confirmedCases) {
		var auxJson = JSON.parse(localStorage.confirmedCases);
		showChart(calcSex(auxJson), forShowData(auxJson, values[0]))
	}
	if (localStorage.deaths) {
		var auxJson = JSON.parse(localStorage.deaths);
		forShowData(auxJson, values[1]);
	}
	if (localStorage.activeCases) {
		var auxJson = JSON.parse(localStorage.activeCases);
		var aux = 0;
		forShowData(auxJson, values[2]);
	}
	if (localStorage.recoveredCases) {
		var auxJson = JSON.parse(localStorage.recoveredCases);
		forShowData(auxJson, values[3]);
	}
	if (localStorage.dailyCases) {
		var auxJson = JSON.parse(localStorage.dailyCases);
		showTable(auxJson);
	}
	if (localStorage.topStates) {
		var auxJson = JSON.parse(localStorage.topStates);
		showTopStates(auxJson);
	}
	if (localStorage.formulario) {
		var auxJson = JSON.parse(localStorage.formulario);
		calcRisk(auxJson);
	}
	// Make fetch to get data in background and save it
	formData.append("entidad", locationCityState.state);
	formData.append("municipio", locationCityState.city);
	fetch("config/app.php?getConfirmedCases", {
		method: 'POST',
		body: formData
	})
		.then(response => response.json())
		.then(data => {
			localStorage.confirmedCases = JSON.stringify(data);
			showChart(calcSex(data), forShowData(data, values[0]))
		})
		.catch(e => {
			console.log(e);
		})
	// Make fetch to get data in background and save it
	fetch("config/app.php?getDeaths", {
		method: 'POST',
		body: formData
	})
		.then(response => response.json())
		.then(data => {
			localStorage.deaths = JSON.stringify(data);
			forShowData(data, values[1]);
		})
		.catch(e => {
			console.log(e);
		})
	// Make fetch to get data in background and save it
	fetch("config/app.php?getActiveCases", {
		method: 'POST',
		body: formData
	})
		.then(response => response.json())
		.then(data => {
			localStorage.activeCases = JSON.stringify(data);
			forShowData(data, values[2]);
		})
		.catch(e => {
			console.log(e);
		})
	// Make fetch to get data in background and save it
	fetch("config/app.php?getRecoveredCases", {
		method: 'POST',
		body: formData
	})
		.then(response => response.json())
		.then(data => {
			localStorage.recoveredCases = JSON.stringify(data);
			forShowData(data, values[3]);
		})
		.catch(e => {
			console.log(e);
		})
	// Make fetch to get data in background and save it
	fetch("config/app.php?getDailyCases", {
		method: 'POST',
		body: formData
	})
		.then(response => response.json())
		.then(data => {
			localStorage.dailyCases = JSON.stringify(data);
			showTable(data);
		})
		.catch(e => {
			console.log(e);
		})
	// Make fetch to get data in background and save it
	fetch("config/app.php?getTopStates", {
		method: 'POST',
		body: formData
	})
		.then(response => response.json())
		.then(data => {
			localStorage.topStates = JSON.stringify(data);
			showTopStates(data);
		})
		.catch(e => {
			console.log(e);
		})
}

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
			locationCityState["city"] = data.address.city.toUpperCase();
			locationCityState["state"] = data.address.state.toUpperCase();
			if (aux = document.getElementById("formulario")) {
				document.getElementById("inputLocation").value = locationCityState.city.toUpperCase() + ", " + locationCityState.state.toUpperCase();
			}
			if (values = document.getElementsByClassName("h5 mb-0 font-weight-bold text-gray-800"))
				showData(values);
		}) .catch(e => { 
			console.log(e);
		});
}

if (boton = document.getElementById("boton")) {
	checkInput = document.getElementsByClassName("form-check-input");
	boton.addEventListener("click", event => {
		event.preventDefault();
		if (parseInt(document.getElementById("inputAge").value) >= 1 && parseInt(document.getElementById("inputAge").value) <= 110 && document.getElementById("selectSex").value != "Select" && document.getElementById("inputLocation").value != "") {
			formulario = {};
			formulario.inputAge = parseInt(document.getElementById("inputAge").value);
			formulario.selectSex = parseInt(document.getElementById("selectSex").value);
			formulario.inputLocation = document.getElementById("inputLocation").value;
			(checkInput[0].checked) ? formulario.checkPregnant = 1 : formulario.checkPregnant = 2;
			(checkInput[1].checked) ? formulario.hipertension = 1 : formulario.hipertension = 2;
			(checkInput[2].checked) ? formulario.diabetes = 1 : formulario.diabetes = 2;
			(checkInput[3].checked) ? formulario.obesidad = 1 : formulario.obesidad = 2;
			(checkInput[4].checked) ? formulario.asma = 1 : formulario.asma = 2;
			if (localStorage.formulario = JSON.stringify(formulario)) {
				boton.innerText = "Done";
				boton.className = "btn btn-success";
			}
		}
		else {
			boton.innerText = "Fill the form";
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

