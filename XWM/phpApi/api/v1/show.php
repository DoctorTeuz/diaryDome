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
		case 'getDetail':
			try {
				$response = getDetail();
			} catch (Throwable $th) {
				$response = $th;
			}
			echo json_encode($response);
			break;	
		case 'publish':
			try {
				$response = publish();
			} catch (Throwable $th) {
				$response = $th;
			}
			echo json_encode($response);
			break;		
		case 'depublish':
			try {
				$response = depublish();
			} catch (Throwable $th) {
				$response = $th;
			}
			echo json_encode($response);
			break;			
		case 'createNewSegment':
			try {
				$response = createNewSegment();
			} catch (Throwable $th) {
				$response = $th;
			}
			echo json_encode($response);
			break;
		case 'updateSegment':
			try {
				$response = updateSegment();
			} catch (Throwable $th) {
				$response = $th;
			}
			echo json_encode($response);
			break;
		case 'deleteSegment':
			try {
				$response = deleteSegment();
			} catch (Throwable $th) {
				$response = $th;
			}
			echo json_encode($response);
			break;	
			
		case 'moveSegment':
			try {
				$response = moveSegment();
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

function publish(){
	$db=new Connection();
	$db->connetti();
	$response = new ResponseObject();

	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);
	
	$userId = $request->userId;
	$id = $request->showId;

	$show = new Show($db);
	if($show->publishShow($userId, $id, 1)){
		$response->status = 200;
		$response->body = 'Pubblicato';
		return $response;
	}else{
		$response = new ResponseObject();
		$response->status = 500;
		$response->body = 'Internal Server Error';
		return $response;
	}
}

function depublish(){
	$db=new Connection();
	$db->connetti();
	$response = new ResponseObject();

	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);
	
	$userId = $request->userId;
	$id = $request->showId;

	$show = new Show($db);
	if($show->publishShow($userId, $id, 0)){
		$response->status = 200;
		$response->body = 'Rimossa la pubblicazione';
		return $response;
	}else{
		$response = new ResponseObject();
		$response->status = 500;
		$response->body = 'Internal Server Error';
		return $response;
	}
}

function getDetail(){
	$db=new Connection();
	$db->connetti();
	$response = new ResponseObject();

	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);
	
	$userId = $request->userId;
	$showId = $request->showId;

	$show = new Show($db);
	$angles = $show->getShowDetail($userId, $showId);
	if(count($angles) == 0){
		$response->status = 200;
		$response->body = "Nessun Angle Trovato";
		return $response;
	}
	else{
		$det = array_map('mapShowDetail', $db -> estraiArray($angles));
		$body->showDetail = $det;
		$response->body = $body;
		$response->status = 200;
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

function mapShowDetail($response){
	$showDetail->segmentId = $response['segmentId'];
	$showDetail->showId = $response['showId'];
	$showDetail->orderAppear = $response['orderAppear'];
	$showDetail->placement = $response['placement'];
	$showDetail->title = $response['title'];
	$showDetail->rating = $response['rating'];
	$showDetail->segmentType = $response['segmentType'];
	$showDetail->shownTitle = $response['shownTitle'];
	$showDetail->content = $response['content'];
	$showDetail->graphicColor = $response['graphicColor'];
	$showDetail->workers = $response['workers'];
	$showDetail->championship = $response['championship'];
	$showDetail->champion = $response['champion'];
	$showDetail->matchType = $response['matchType'];
	$showDetail->matchScheme = $response['matchScheme'];
	$showDetail->matchWorkers = $response['matchWorkers'];
	$showDetail->matchWinner = $response['matchWinner'];
	$showDetail->titleChange = $response['titleChange'];
	$showDetail->showName = $response['showName'];
	$showDetail->confirmed = $response['confirmed'];
	$showDetail->formatId = $response['formatId'];
	$showDetail->DayWeek = $response['DayWeek'];
	$showDetail->Week = $response['Week'];
	$showDetail->M = $response['M'];
	$showDetail->Y = $response['Y'];
	$showDetail->pubblico = $response['pubblico'];
	$showDetail->arena = $response['arena'];
	$showDetail->citta = $response['citta'];
	$showDetail->soldOut = $response['soldOut'];
	$showDetail->showRating = $response['showRating'];
	$showDetail->championshipAdv = $response['championshipAdv'];
	$showDetail->userId = $response['userId'];

	return $showDetail;
}

function findChampionship($titleName, $userId){
	$targetDir = $userId."/Belts/";
	$titleCode = str_replace("'", "", $titleName);
	$titleCode = str_replace(".", "", $titleCode);
	$titleCode = str_replace(" ", "_", $titleCode);

	$files = glob($targetDir.$titleCode."*.*");
	if(count($files)==0){
	  return "noImage";
	}
	else{
	  $max = 100;
	  for($k = 1; $k<$max; $k++){
		$checkText = $targetDir.$titleCode."_".$k.".";
		if($k == 1){
		  $checkText = $targetDir.$titleCode.".";
		}
		$found = false;
		for($p = 0; $p < count($files); $p++){
		  if(strpos($files[$p], $checkText) === 0){
			$img = $files[$p];
			$found = true;
		  }
		}

		if(!$found && $max == 100){
		  $max = $k + 2;
		}
	  }
	  return $img;
	}
}

function createNewSegment(){
	$db=new Connection();
	$db->connetti();
	$response = new ResponseObject();

	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);

	$segment = $request->segment;
	$userId = $segment->userId;
	$showId = $segment->showId;

	$show = new Show($db);
	if($show->createSegment($segment)){
		$angles = $show->getShowDetail($userId, $showId);
		if(count($angles) == 0){
			$response->status = 200;
			$response->body = "Nessun Angle Trovato";	
			return $response;
		}
		else{
			$det = array_map('mapShowDetail', $db -> estraiArray($angles));
			$body->showDetail = $det;
			$response->body = $body;
			$response->status = 200;
			return $response;
		}
	}else{
		$response = new ResponseObject();
		$response->status = 500;
		$response->body = 'Internal Server Error';
		return $response;
	}
}

function updateSegment(){
	$db=new Connection();
	$db->connetti();
	$response = new ResponseObject();

	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);

	$segment = $request->segment;
	$userId = $segment->userId;
	$showId = $segment->showId;

	$show = new Show($db);
	if($show->editSegment($segment)){
		$angles = $show->getShowDetail($userId, $showId);
		if(count($angles) == 0){
			$response->status = 200;
			$response->body = "Nessun Angle Trovato";	
			return $response;
		}
		else{
			$det = array_map('mapShowDetail', $db -> estraiArray($angles));
			$body->showDetail = $det;
			$response->body = $body;
			$response->status = 200;
			return $response;
		}
	}else{
		$response = new ResponseObject();
		$response->status = 500;
		$response->body = 'Internal Server Error';
		return $response;
	}
}

function deleteSegment(){
	$db=new Connection();
	$db->connetti();
	$response = new ResponseObject();

	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);
	
	$userId = $request->userId;
	$segmentId = $request->segmentId;

	$show = new Show($db);
	if($show->deleteSeg($userId, $segmentId)){
		$response->status = 200;
		$response->body = 'OK';
		return $response;
	}else{
		$response = new ResponseObject();
		$response->status = 500;
		$response->body = 'Internal Server Error';
		return $response;
	}
}

function moveSegment(){
	$db=new Connection();
	$db->connetti();
	$response = new ResponseObject();

	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);
	
	$segmentA = $request->segmentA;
	$segmentB = $request->segmentB;
	$segAnewPos = $request->segAnewPos;
	$segBnewPos = $request->segBnewPos;
	$userId = $request->userId;
	$showId = $request->showId;
	$show = new Show($db);
	if($show->moveSeg($segmentA, $segmentB, $segAnewPos, $segBnewPos)){
		$angles = $show->getShowDetail($userId, $showId);
		if(count($angles) == 0){
			$response->status = 200;
			$response->body = "Nessun Angle Trovato";	
			return $response;
		}
		else{
			$det = array_map('mapShowDetail', $db -> estraiArray($angles));
			$body->showDetail = $det;
			$response->body = $body;
			$response->status = 200;
			return $response;
		}
	}else{
		$response = new ResponseObject();
		$response->status = 500;
		$response->body = 'Internal Server Error';
		return $response;
	}
}
?>