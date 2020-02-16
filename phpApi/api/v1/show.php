<?php

include_once '../../config/connection.php';
include_once '../../config/responseObject.php';
include_once '../../objects/show.php';
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
		case 'getShowList':
			try {
				$id = $params && $params->userId ? $params->userId : false;
				$response = getShowList($id);
			} catch (Throwable $th) {
				$response = $th;
			}
			echo json_encode($response);
			break;
		case 'createNewShow':
			try {
				$response = createNewShow();
			} catch (Throwable $th) {
				$response = $th;
			}
			echo json_encode($response);
			break;
		case 'deleteShow':
			try {
				$response = deleteShow();
			} catch (Throwable $th) {
				$response = $th;
			}
			echo json_encode($response);
			break;
		case 'updateShow':
			try {
				$response = updateShow();
			} catch (Throwable $th) {
				$response = $th;
			}
			echo json_encode($response);
			break;			
		default:
			$response = new ResponseObject();
			$response->status = 404;
			$response->body = 'Funzione non esistente';
			break;
	}
}





function getShowList($id){
	$db=new Connection();
	$db->connetti();
	$response = new ResponseObject();
	
	$show = new Show($db);
	$showList = $db -> estraiArray($show->readShowList($id));
	
	$num = /* mysql_num_rows($workers) */ count($showList);
	if($num == 0){
		$response->status = 200;
		$response->body = "Nessuno Show Trovato";
		return $response;
	}
	else{
		
		$showFinalList = array_map('mapShows', $showList);
		$body->showList = $showFinalList;
		$response->body = $body;
		$response->status = 200;
		return $response;
	}
}	

function createNewShow(){
	$db=new Connection();
	$db->connetti();
	$response = new ResponseObject();

	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);

	$show = new Show($db);
	$showMap = mapNewShow($request);
	$last_ID = $show->createShow($showMap);
	if($show->createBridge($request->userId, $last_ID)){
		$response = getShowList($request->userId);
		return $response;
	}else{
		$response = new ResponseObject();
		$response->status = 500;
		$response->body = 'Internal Server Error';
		return $response;
	}
}

function deleteShow(){
	$db=new Connection();
	$db->connetti();
	$response = new ResponseObject();

	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);
	
	$userId = $request->userId;
	$id = $request->showId;

	$show = new Show($db);
	if($show->delete($userId, $id)){
		$response = getShowList($userId);
		return $response;
	}else{
		$response = new ResponseObject();
		$response->status = 500;
		$response->body = 'Internal Server Error';
		return $response;
	}
}

function mapShows($show){
	$showData->showName = $show['Label'];
	$showData->posted = $show['Posted'];
	$showData->dayWeek = $show['DayWeek'];
	$showData->week = $show['Week'];
	$showData->month = $show['M'];
	$showData->year = $show['Y'];
	$showData->pubblico = $show['Attendance'];
	$showData->arena = $show['Arena'];
	$showData->city = $show['City'];
	$showData->soldOut = $show['SoldOut'];
	$showData->voto = $show['Graduation'];
	$showData->imageUrl = $show['Picture'];
	$showData->eventType = $show['EventType'];
	$showData->ID = $show['ID'];
	$showData->baseColor = $show['soldOutColor'];
	$showData->formatId =  $show['formatId'];
	
	return $showData;
}

function updateShow(){
	$db=new Connection();
	$db->connetti();
	$response = new ResponseObject();

	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);

	$show = new Show($db);
	$showMap = mapNewShow($request);
	if($show->update($showMap)){
		$response = getShowList($request->userId);
		return $response;
	}else{
		$response = new ResponseObject();
		$response->status = 500;
		$response->body = 'Internal Server Error';
		return $response;
	}
}

function mapNewShow($request){
	$showData->showLabel = $request->showLabel;
	$showData->year = $request->year;
	$showData->eventType = $request->eventType;
	$showData->formatID = $request->formatID;
	$showData->dayWeek = $request->dayWeek;
	$showData->week = $request->week;
	$showData->month = $request->month;
	$showData->attendance = $request->attendance ? $request->attendance : 'NULL';
	$showData->arena = $request->arena;
	$showData->city = $request->city;
	$showData->soldout = $request->soldout;
	$showData->rating = $request->rating;
	$showData->showPicture = $request->showPicture;
	$showData->userId = $request->userId;
	$showData->showId = $request->showId;
	
	return $showData;
}

?>