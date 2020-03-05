<?php

include_once '../../config/connection.php';
include_once '../../config/responseObject.php';
include_once '../../objects/worker.php';
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
		case 'getWorkers':
			try {
				$response = getWorkerFunction();
			} catch (Throwable $th) {
				$response = $th;
			}
			echo json_encode($response);
			break;
		case 'getSingleWorker':
			try {
				$id = $params && $params->workerId ? $params->workerId : false;
				if($id === false){
					$response = new ResponseObject();
					$response->status = 500;
					$response->body = 'Chiamata la funzione di ricerca singola senza workerId';
				}
				else{
					$response = getSingleWorkerFunction($id);
				}
			} catch (Throwable $th) {
				$response = $th;
			}
			echo json_encode($response);
			break;
		case 'getAlumni':
			try {
				$response = getAlumni();
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




function getSingleWorkerFunction($id){
	$db=new Connection();
	$db->connetti();
	$response = new ResponseObject();

	$worker = new Worker($db);
	$workers = $db -> estraiArray($worker->getSingleWorker($id));
	$num = count($workers);
	if($num == 0){
		$response->status = 200;
		$response->error = "Nessun Worker Trovato";
		return $response;
	}
	else{
		$divisions = array_map('mapDivision', $db -> estraiArray($worker->getDivisionSingleWorker($id)));
		$brands = array_map('mapBrand', $db -> estraiArray($worker->getBrandSingleWorker($id)));
		$workerArr = array();
		$workerArr = mapSingleWorker($workers[0], $brands, $divisions, $worker, $db);
		$body->worker = $workerArr;
		$response->body = $body;
		$response->status = 200;
		return $response;
	}
}	

function getWorkerFunction(){
	$db=new Connection();
	$db->connetti();
	$response = new ResponseObject();
	
	$worker = new Worker($db);
	$workers = $db -> estraiArray($worker->getWorker());
	$divisions = array_map('mapDivision', $db -> estraiArray($worker->getDivision()));
	$brands = array_map('mapBrand', $db -> estraiArray($worker->getBrand()));
	$champions = array_map('mapChampions', $db -> estraiArray($worker->getChampions()));
	$num = /* mysql_num_rows($workers) */ count($workers);
	if($num == 0){
		$response->status = 200;
		$response->error = "Nessun Worker Trovato";
		return $response;
	}
	else{
		$workerArr = array();
		$workerArr = mapWorker($workers, $brands, $divisions, $champions);
		$body->workers = $workerArr;
		$response->body = $body;
		$response->status = 200;
		return $response;
	}
}	

function mapWorker($w, $b, $d, $c){
	$finalArray = [];
	for($k = 0; $k < count($w); $k++){
		$holdTitle = filtraPerWorkerName($c, $w[$k]['Ringname'])->Title;
		$workerImg = str_replace(" ", "_", $w[$k]['Ringname']);
		$workerImg = str_replace("'", "", $workerImg);
		$workerObj = new singleWorker();
		$workerObj->ID = $w[$k]['ID'];
		$workerObj->Ringname = $w[$k]['Ringname'];
		$workerObj->Sesso = $w[$k]['Sesso'] == 1 ? 'M' : 'F';
		$workerObj->Cruiser = $w[$k]['Sesso'] == 1 && $w['Cruiser'] == 1;
		$workerObj->Brand = filtraPerWorker($b, $w[$k]['ID'])->brand;
		$workerObj->Division = filtraPerWorker($d, $w[$k]['ID'])->division;
		$workerObj->Title = $holdTitle;
		$workerObj->ImageLink = grabImage("1/", $workerImg, $holdTitle);
		array_push($finalArray, $workerObj);
	}
	return $finalArray;
}

function mapSingleWorker($w, $b, $d, $worker, $db){
	$wrk->ID = $w['ID'];
	$wrk->Ringname = $w['Ringname'];
	$wrk->Realname = $w['Realname'];
	$wrk->Birthday = $w['Birthday'];
	$wrk->Age = $w['Age'];
	$wrk->Sesso = $w['Sesso'] == 1 ? 'M' : 'F';	
	$wrk->Cruiser = $w['Sesso'] == 1 && $w['Cruiser'] == 1;	
	$wrk->Brand = $b[0]->brand;	
	$wrk->Division = $d[0]->division;	
	$wrk->Alias = array_map('mapAlias', $db -> estraiArray($worker->getWorkerAliases($w['ID'])));	
	$wrk->Finisher = array_map('mapFinisher', $db -> estraiArray($worker->getWorkerFinishers($w['ID'])));	
	$wrk->Trademark = array_map('mapTrademark', $db -> estraiArray($worker->getWorkerSignatures($w['ID'])));
	$wrk->Nicknames = array_map('mapNicknames', $db -> estraiArray($worker->getWorkerNicknames($w['ID'])));
	$wrk->Albo = array_map('mapAlbo', $db -> estraiArray($worker->getAlbo($w['Ringname'], $wrk->Alias)));

	$workerImg = str_replace(" ", "_", $wrk->Ringname);
	$workerImg = str_replace("'", "", $workerImg);

	$wrk->ImageLink = grabImage("1/", $workerImg, null);
	
	return $wrk;
}

function mapDivision($d){
	$division->workerId = $d['workerId'];
	$division->division = $d['Division'];
	return $division;
}

function mapBrand($b){
	$brand->workerId = $b['workerId'];
	$brand->brand = $b['Brand'];
	return $brand;
}

function mapChampions($c){
	$champions->Title = $c['Title'];
	$champions->Champion = utf8_encode($c['Champion']);
	$champions->T1 = utf8_encode($c['TagPartner1']);
	$champions->T2 = utf8_encode($c['TagPartner2']);
	$champions->T3 = utf8_encode($c['TagPartner3']);
	
	return $champions;
}

function mapAlbo($a){
	$albo->Title = utf8_encode($a['Title']);
	$albo->Reigns = $a['Reign'];
	$albo->CombinateDays = is_null($a['CashIn']) && is_null($a['RunnerUp']) ? (is_null($a['Tot']) ? 0 : $a['Tot']) : null;
	$albo->Current = is_null($a['Duration']) && is_null($a['CashIn']) && is_null($a['RunnerUp']) ? true : false;
	$albo->Date = utf8_encode($a['Date']);
	$albo->Duration = $a['Duration'];
	$albo->RunnerUp = utf8_encode($a['RunnerUp']);
	$albo->CashIn = $a['CashIn'];
	
	return $albo;
}

function mapAlias($al){
	return utf8_encode($al['Alias']);
}

function mapTrademark($t){
	return utf8_encode($t['Trademark']);
}

function mapNicknames($n){
	return utf8_encode($n['Nickname']);
}

function mapFinisher($f){
	return utf8_encode($f['Finisher']);
}

function filtraPerWorker($array, $workerId){
	$finalRow;
	for($j = 0; $j<count($array); $j++){
		if(intVal($array[$j]->workerId) == intVal($workerId)){
			$finalRow = $array[$j];
			break;
		}
	}

	return $finalRow;
}

function filtraPerWorkerName($array, $workerName){
	$finalRow = null;
	for($j = 0; $j<count($array); $j++){
		if($array[$j]->Champion === $workerName ||
			$array[$j]->T1 === $workerName ||
			$array[$j]->T2 === $workerName ||
			$array[$j]->T3 === $workerName){
			$finalRow = $array[$j];
			break;
		}
	}
	return $finalRow;
}

function getAlumni(){
	$db=new Connection();
	$db->connetti();
	$response = new ResponseObject();
	
	$worker = new Worker($db);

	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);
	
	$userId = $request->userId;
	$workers = $db -> estraiArray($worker->getAlumniByUser($userId));
	
	$num = /* mysql_num_rows($workers) */ count($workers);
	if($num == 0){
		$response->status = 200;
		$response->error = "Nessun Worker Trovato";
		return $response;
	}
	else{
		$workerArr = array();
		$workerArr = array_map('mapAlumni', $workers);
		$body->archivedImages = $workerArr;
		$response->body = $body;
		$response->status = 200;
		return $response;
	}
}	

function mapAlumni($a){
	return utf8_encode($a['Image']);
}


class singleWorker{
	public $ID;
	public $Ringname;
	public $Sesso;
	public $Cruiser;
	public $Brand;
	public $Division;
	public $Title;
	public $ImageLink;
}

?>