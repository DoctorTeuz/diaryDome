<?php

include_once '../../config/connection.php';
include_once '../../config/responseObject.php';
include_once '../../objects/dinastyActions.php';
include_once 'miscellaneous.php';



$method = $_SERVER['REQUEST_METHOD'];
$uri = $_SERVER['REQUEST_URI'];
$uriArray = explode(".php/", $uri);
$vals = explode('?', explode('/', $uriArray[1])[0]);
$action = $vals[0];
global $params;
$params = count($vals)>1 ? mapParams($vals[1]) : null;

if($method != 'OPTIONS'){
	switch ($action) {
		default:
			$response = new ResponseObject();
			$response->status = 404;
			$response->body = 'Funzione non esistente';
			echo json_encode($response);
			break;
	}
}



}

?>