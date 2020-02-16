<?php

include_once '../../config/connection.php';
include_once '../../config/responseObject.php';
include_once '../../objects/albo.php';
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
		case 'getAlbo':
			try {
				$response = getAlboFunction();
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




function getAlboFunction($id){
	$db=new Connection();
	$db->connetti();
	$response = new ResponseObject();

	$albo = new Albo($db);
	$albodoro = $db -> estraiArray($albo->getAlbo());
	$num = count($albodoro);
	if($num == 0){
		$response->status = 200;
		$response->error = "Nessun Titolo Trovato";
		return $response;
	}
	else{
		$alboData = array_map('mapAlbo', $albodoro);
		$body->albo = $alboData;
		$response->body = $body;
		$response->status = 200;
		return $response;
	}
}	

function mapAlbo($m){
	$albo->ID = $m['ID'];
    $albo->Title = utf8_encode($m['Title']);
    $albo->Importance = $m['Importance'];
	$albo->Champion = utf8_encode($m['Champion']);
    $albo->Date = utf8_encode($m['Date']);
	$albo->ChangeShow = utf8_encode($m['ChangeShow']);
	$albo->Duration = $m['Duration'];
	$albo->Current = is_null($m['Duration']) && is_null($m['CashIn']) && is_null($m['RunnerUp']) ? true : false;
	
	$tagComp = [];
	$tagCompImageLink = [];
	if(!is_null($m['TagPartner1']) && !is_null($m['TagPartner2'])){
		array_push($tagComp, utf8_encode($m['TagPartner1']));
		$workerImg = str_replace(" ", "_", $m['TagPartner1']);
		$workerImg = str_replace("'", "", $workerImg);
		array_push($tagCompImageLink, grabImage("1/", $workerImg, ""));
		array_push($tagComp, utf8_encode($m['TagPartner2']));
		$workerImg = str_replace(" ", "_", $m['TagPartner2']);
		$workerImg = str_replace("'", "", $workerImg);
		array_push($tagCompImageLink, grabImage("1/", $workerImg, ""));
		if(!is_null($m['TagPartner3'])){
			array_push($tagComp, utf8_encode($m['TagPartner3']));
			$workerImg = str_replace(" ", "_", $m['TagPartner3']);
			$workerImg = str_replace("'", "", $workerImg);
			array_push($tagCompImageLink, grabImage("1/", $workerImg, ""));
		}
	}
	if(count($tagCompImageLink) == 0){
		$workerImg = str_replace(" ", "_", $albo->Champion);
		$workerImg = str_replace("'", "", $workerImg);
		array_push($tagCompImageLink, grabImage("1/", $workerImg, ""));
	}
	
	$albo->ChampionsImageLink = $tagCompImageLink;
	$albo->TagComposition = count($tagComp) > 0 ? $tagComp : null;
	$albo->CashIn = $m['CashIn'];
	$albo->RunnerUp = $m['RunnerUp'];
	$albo->MainRoster = $m['MainRoster'];
	$albo->Type = is_null($m['CashIn']) && is_null($m['RunnerUp']) ? 'Belt' : 
					(is_null($m['RunnerUp']) ? 'MITB' : 
					($albo->Title != 'WWE Royal Rumble' && $albo->Title != 'WWE Women Royal Rumble' ? 'Tournament' : 'Rumble'));

	return $albo;
}
?>