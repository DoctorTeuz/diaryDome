<?php

include_once '../../config/connection.php';
include_once '../../config/responseObject.php';
include_once '../../objects/login.php';
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
		case 'login':
			try {
				$response = checkLogin();
			} catch (Throwable $th) {
				$response = $th;
			}
			echo json_encode($response);
			break;
		case 'register':
			try {
				$response = register();
			} catch (Throwable $th) {
				$response = $th;
			}
			echo json_encode($response);
			break;
		default:
			$response = new ResponseObject();
			$response->status = 404;
			$response->body = null;
			$response->error = 'Funzione non esistente';
			break;
	}
}

function checkLogin(){
	$db=new Connection();
	$db->connetti();
	$response = new ResponseObject();

	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);

	$logs = new Login($db);
	$log = $db -> estraiArray($logs->tryLogin($request->username, $request->password));
	$num = count($log);
	if($num == 0){
		$response->status = 200;
		$response->error = "Nome Utente o Password Errati";
		return $response;
	}
	else{
		$user = mapUser($log[0]);
		$user->VSurl = getVSUrl($user->ID);
		$user->titleList = getTitleList($user->ID);
		$user->workerImageList = getUserWorkerList($user->ID);
		$body->user = $user;
		$response->body = $body;
		$response->status = 200;
		return $response;
	}
}	

function mapUser($log){
    $user->ID = $log['ID'];
    $user->Username = $log['Username'];
	$user->dateFormat = $log['dateFormat'];
    $user->userType = $log['userType'];
	return $user;
}

function register(){
	$db=new Connection();
	$db->connetti();
	$response = new ResponseObject();

	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);

	$logs = new Login($db);
	$chk = $logs->doRegister($request->username, $request->password, $request->datetype);
	if($chk == "Già censito"){
		$response->status = 200;
		$response->error = "Il nome utente è già censito.";
		return $response;
	}
	else if(!$chk){
		$response->status = 500;
		$response->error = "Internal Server Error";
		return $response;
	}
	else{
		$log = $db -> estraiArray($logs->tryLogin($request->username, $request->password));
		$num = count($log);
	
		$user = mapUser($log[0]);
		$user->VSurl = getVSUrl($user->ID);
		$user->titleList = getTitleList($user->ID);
		$user->workerImageList = getUserWorkerList($user->ID);
		$body->user = $user;
		$response->body = $body;
		$response->status = 200;
		return $response;
	}
}
?>