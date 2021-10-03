<?php
require_once "db.php";
if (!empty($_GET)) {
	$getConfirmedCases = \in_array('getConfirmedCases',array_keys(\filter_input_array(INPUT_GET)));
	if($getConfirmedCases) {
		$arr = array("error" => 1);
		$municipio = $_POST['municipio'];
		$entidad = $_POST['entidad'];
		$result = $mysqli->query(`SELECT COUNT(*), data.SEXO FROM data WHERE CLASIFICACION_FINAL IN (1, 2, 3) AND ENTIDAD_RES = (SELECT entidad.ID from entidad WHERE entidad.ENTIDAD = "$entidad") AND MUNICIPIO_RES = (SELECT municipio.ID from municipio WHERE municipio.MUNICIPIO = "$municipio") GROUP BY SEXO`);

		if ($result) {
			$arr = $result -> fetch_all(MYSQLI_ASSOC);
		}
		echo json_encode($arr);
	}
	$getRecoveredCases = \in_array('getRecoveredCases',array_keys(\filter_input_array(INPUT_GET)));
	if($getDeaths) {
		$arr = array("error" => 1);
		$municipio = $_POST['municipio'];
		$entidad = $_POST['entidad'];
		$result = $mysqli->query(`SELECT COUNT(*), SEXO FROM data WHERE DATEDIFF(CURRENT_DATE(), FECHA_INGRESO) > 42 AND CLASIFICACION_FINAL IN (1, 2, 3) AND FECHA_DEF = "0000-00-00" AND ENTIDAD_RES = (SELECT entidad.ID from entidad WHERE entidad.ENTIDAD = "$entidad") AND MUNICIPIO_RES = (SELECT municipio.ID from municipio WHERE municipio.MUNICIPIO = "$municipio") GROUP BY SEXO`);

		if ($result) {
			$arr = $result -> fetch_all(MYSQLI_ASSOC);
		}
		echo json_encode($arr);
	}
	$getActiveCases = \in_array('getActiveCases',array_keys(\filter_input_array(INPUT_GET)));
	if($getActiveCases) {
		$arr = array("error" => 1);
		$municipio = $_POST['municipio'];
		$entidad = $_POST['entidad'];
		$result = $mysqli->query(`SELECT COUNT(*), SEXO FROM data WHERE DATEDIFF(CURRENT_DATE(), FECHA_INGRESO) <= 12 AND CLASIFICACION_FINAL IN (1, 2, 3) AND FECHA_DEF = "0000-00-00" AND ENTIDAD_RES = (SELECT entidad.ID from entidad WHERE entidad.ENTIDAD = "$colima") AND MUNICIPIO_RES = (SELECT municipio.ID from municipio WHERE municipio.MUNICIPIO = "$municipio") GROUP BY SEXO`);

		if ($result) {
			$arr = $result -> fetch_all(MYSQLI_ASSOC);
		}
		echo json_encode($arr);
	}
	$getDeaths = \in_array('getDeaths',array_keys(\filter_input_array(INPUT_GET)));
	if($getDeaths) {
		$arr = array("error" => 1);
		$municipio = $_POST['municipio'];
		$entidad = $_POST['entidad'];
		$result = $mysqli->query(`SELECT COUNT(*), SEXO FROM data WHERE FECHA_DEF != "0000-00-00" AND CLASIFICACION_FINAL IN (1, 2, 3) AND ENTIDAD_RES = (SELECT entidad.ID from entidad WHERE entidad.ENTIDAD = "$entidad") AND MUNICIPIO_RES = (SELECT municipio.ID from municipio WHERE municipio.MUNICIPIO = "$municipio") GROUP BY SEXO`);

		if ($result) {
			$arr = $result -> fetch_all(MYSQLI_ASSOC);
		}
		echo json_encode($arr);
	}
	$getTopStates = \in_array('getTopStates',array_keys(\filter_input_array(INPUT_GET)));
	if($getTopStates) {
		$arr = array("error" => 1);
		$result = $mysqli->query(`SELECT COUNT(*), (SELECT entidad.ENTIDAD from entidad where entidad.ID = ENTIDAD_RES) as ENTIDAD FROM data WHERE CLASIFICACION_FINAL IN (1, 2, 3) GROUP BY ENTIDAD_RES ORDER BY COUNT(*) DESC LIMIT 5`);

		if ($result) {
			$arr = $result -> fetch_all(MYSQLI_ASSOC);
		}
		echo json_encode($arr);
	}
	$getDailyCases = \in_array('getDailyCases',array_keys(\filter_input_array(INPUT_GET)));
	if($getDailyCases) {
		$arr = array("error" => 1);
		$municipio = $_POST['municipio'];
		$entidad = $_POST['entidad'];
		$result = $mysqli->query(`SELECT SEXO,
			SUM(CASE WHEN DATEDIFF(DATE_SUB(CURRENT_DATE(), INTERVAL 5 DAY), FECHA_INGRESO) <= 12 THEN 1 ELSE 0 END) Dia6,
			SUM(CASE WHEN DATEDIFF(DATE_SUB(CURRENT_DATE(), INTERVAL 4 DAY), FECHA_INGRESO) <= 12 THEN 1 ELSE 0 END) Dia5,
			SUM(CASE WHEN DATEDIFF(DATE_SUB(CURRENT_DATE(), INTERVAL 3 DAY), FECHA_INGRESO) <= 12 THEN 1 ELSE 0 END) Dia4,
			SUM(CASE WHEN DATEDIFF(DATE_SUB(CURRENT_DATE(), INTERVAL 2 DAY), FECHA_INGRESO) <= 12 THEN 1 ELSE 0 END) Dia3,
			SUM(CASE WHEN DATEDIFF(DATE_SUB(CURRENT_DATE(), INTERVAL 1 DAY), FECHA_INGRESO) <= 12 THEN 1 ELSE 0 END) Dia2,
			SUM(CASE WHEN DATEDIFF(CURRENT_DATE(), FECHA_INGRESO) <= 12 THEN 1 ELSE 0 END) Dia
			FROM data WHERE DATEDIFF(CURRENT_DATE(), FECHA_INGRESO) <= 18 AND CLASIFICACION_FINAL IN (1, 2, 3) AND FECHA_DEF = "0000-00-00" AND ENTIDAD_RES = (SELECT entidad.ID from entidad WHERE entidad.ENTIDAD = "$entidad") AND MUNICIPIO_RES = (SELECT municipio.ID from municipio WHERE municipio.MUNICIPIO = "$municipio") GROUP BY SEXO`);

		if ($result) {
			$arr = $result -> fetch_all(MYSQLI_ASSOC);
		}
		echo json_encode($arr);
	}
	$getFactorRisk = \in_array('getFactorRisk',array_keys(\filter_input_array(INPUT_GET)));
	if($getFactorRisk) {
		$arr = array("error" => 1);
		$municipio = $_POST['municipio'];
		$entidad = $_POST['entidad'];
		$obesidad = $_POST['obesidad'];
		$hipertension = $_POST['hipertension'];
		$asma = $_POST['asma'];
		$diabetes = $_POST['diabetes'];
		$result = $mysqli->query(`SELECT COUNT(*), data.SEXO FROM data WHERE CLASIFICACION_FINAL IN (1, 2, 3) AND ENTIDAD_RES = (SELECT entidad.ID from entidad WHERE entidad.ENTIDAD = "$entidad") AND MUNICIPIO_RES = (SELECT municipio.ID from municipio WHERE municipio.MUNICIPIO = "$municipio") AND (UCI = 1 OR FECHA_DEF != "0000-00-00") AND OBESIDAD IN (2, $obesidad) AND HIPERTENSION IN (2, $hipertension) AND ASMA IN (2, $asma) AND DIABETES IN (2, $diabetes) GROUP BY SEXO`);

		if ($result) {
			$arr = $result -> fetch_all(MYSQLI_ASSOC);
		}
		echo json_encode($arr);
	}
}
?>
