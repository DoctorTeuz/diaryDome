<?php

include_once '../../config/connection.php';
include_once '../../config/responseObject.php';
include_once '../../objects/format.php';
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
		case 'getFormatList':
			try {
				$id = $params && $params->userId ? $params->userId : false;
				$response = getFormats($id);
			} catch (Throwable $th) {
				echo 'QUI'. $th;
				$response = $th;
			}
			echo json_encode($response);
			break;
		case 'active':
				try {
					$response = active('1');
				} catch (Throwable $th) {
					$response = $th;
				}
				echo json_encode($response);
				break;		
		case 'deactive':
				try {
					$response = active('0');
				} catch (Throwable $th) {
					$response = $th;
				}
				echo json_encode($response);
				break;
		case 'createFormat':
			try {
				$response = createNewFormat();
			} catch (Throwable $th) {
				$response = $th;
			}
			echo json_encode($response);
			break;
		case 'uploadLogo':
			try {
				$response = uploadLogo();
			} catch (Throwable $th) {
				$response = $th;
			}
			echo json_encode($response);
			break;
		default:
			$response = new ResponseObject();
			$response->status = 404;
			$response->body = 'Funzione non esistente';
			echo json_encode($response);
			break;
	}
}


function getFormats($id){
	$db=new Connection();
	$db->connetti();
	$response = new ResponseObject();
	
	$frmt = new Format($db);
	$formatList = $db->estraiArray($frmt->readFormats($id));
	
	$num = /* mysql_num_rows($workers) */ count($formatList);
	if($num == 0){
		$response->status = 200;
		$response->body = "Nessuno Format Trovato";
		return $response;
	}
	else{
		$formatFinalList = array_map('mapFormat', $formatList);
		$body->formats = $formatFinalList;
		$response->body = $body;
		$response->status = 200;
		return $response;
	}
}	

function mapFormat($format){
	$formatData->formatId = utf8_encode($format['formatId']);
	$formatData->Name = utf8_encode($format['Name']);
	$formatData->Label = utf8_encode($format['Label']);
	$formatData->EventType = utf8_encode($format['EventType']);
	$formatData->DayWeek = utf8_encode($format['DayWeek']);
	$formatData->Picture = utf8_encode($format['Picture']);
	$formatData->soldOutColor = utf8_encode($format['soldOutColor']);
	$formatData->angleFirstBorderColor = utf8_encode($format['angleFirstBorderColor']);
	$formatData->angleSecondBorderColor = utf8_encode($format['angleSecondBorderColor']);
	$formatData->matchFirstBorderColor = utf8_encode($format['matchFirstBorderColor']);
	$formatData->matchSecondBorderColor = utf8_encode($format['matchSecondBorderColor']);
	$formatData->infographicFirstBorderColor = utf8_encode($format['infographicFirstBorderColor']);
	$formatData->infographicSecondBorderColor = utf8_encode($format['infographicSecondBorderColor']);
	$formatData->workerImageShape = utf8_encode($format['workerImageShape']);
	$formatData->headerFormat = utf8_encode($format['headerFormat']);
	$formatData->angleFormat = utf8_encode($format['angleFormat']);
	$formatData->matchFormat = utf8_encode($format['matchFormat']);
	$formatData->infographicFormat = utf8_encode($format['infographicFormat']);
	$formatData->Attivo = utf8_encode($format['Attivo']);

	return $formatData;
}

function active($active){
	$db=new Connection();
	$db->connetti();
	$response = new ResponseObject();

	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);
	
	$userId = $request->userId;
	$id = $request->formatId;

	$frmt = new Format($db);
	if($frmt->activeFormat($userId, $id, $active)){
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

function createNewFormat(){
	$db=new Connection();
	$db->connetti();
	$response = new ResponseObject();

	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);

	$frmt = new Format($db);
	$userId = $request->userId;
	$format = $request->format;
	$last_ID = $frmt->createFormat($format, $userId);
	if($frmt->createFormatBridge($userId, $last_ID)){
		$response = getFormats($request->userId);
		return $response;
	}else{
		$response = new ResponseObject();
		$response->status = 500;
		$response->body = 'Internal Server Error';
		return $response;
	}
}

function uploadLogo(){

	$name = var_dump($_FILES);
	echo $name;
	/* $showLogoName = $_FILES["showLogo"]["name"];
	$showLogoName = str_replace(" ", "_", $showLogoName);
	$showLogoName = str_replace("'", "", $showLogoName);
	$targetFile = $targetDir.basename($showLogoName);
	$imageFileType = strtolower(pathinfo($targetFile,PATHINFO_EXTENSION));
	move_uploaded_file($_FILES["showLogo"]["tmp_name"], $targetFile);

	if($logo){
		$targetDir = '../../../../DiaryDome/'.$userId."/Loghi/";
		$showLogoName = $format->Name;
		$showLogoName = str_replace(" ", "_", $showLogoName);
		$showLogoName = str_replace("'", "", $showLogoName);

		$files = glob($targetDir.$showLogoName.".*");

		if(count($files)!=0){
			$image = $files;
			if(count($image)>0){
				for($k = 2; $k<100; $k++){
					$files = glob($targetDir.$showLogoName."_".$k.".*");
					if(count($files)>0){
					}
					else{
						$showLogoName = $showLogoName."_".$k;
						break;
					}
				}
			}
		}
		$splitImage=explode(".",$logo->name);
		$imageFileType = $splitImage[count($splitImage)-1];
		$targetFile = $targetDir.basename($showLogoName).'.'.$imageFileType;
		move_uploaded_file($logo->name, $targetFile);
		$picture = str_replace($targetDir, "",$targetFile);
	}
	else{
		$picture = $format->Picture;
	} */
}

?>