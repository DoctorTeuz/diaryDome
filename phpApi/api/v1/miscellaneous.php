<?php
header('Access-Control-Allow-Origin: *', false);
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');
/* header('X-Powered-By: l3utterfly'); */

include_once '../../config/connection.php';
include_once '../../config/responseObject.php';
include_once '../../objects/miscellaneous.php';

$method = $_SERVER['REQUEST_METHOD'];
$uri = $_SERVER['REQUEST_URI'];
$uriArray = explode(".php/", $uri);
$vals = explode('?', explode('/', $uriArray[1])[0]);
$action = $vals[0];
global $params;
$params = count($vals)>1 ? mapParams($vals[1]) : null;

if($method != 'OPTIONS'){
    switch ($action) {
        case 'getTeuzLastShowDate': 
            try {
                $response = getTeuzLastShowDate();
            } catch (Throwable $th) {
                $response = $th;
            }
            echo json_encode($response);
            break;
        case 'getMenu': 
            try {
                $response = getMenu();
            } catch (Throwable $th) {
                $response = $th;
            }
            echo json_encode($response);
            break;
            
            
        default:
            # code...
            break;
    }
}

function mapParams($params){
	$paramsObj;
	$paramsArray = explode('&', $params);
	for($i=0; $i<count($paramsArray); $i++){
		$par = explode('=', $paramsArray[$i]);
		$paramsObj->{$par[0]} = $par[1];
	}
	return $paramsObj;
}


function getTeuzLastShowDate(){
    $db=new Connection();
	$db->connetti();
    $response = new ResponseObject();
    
    $misc = new Misc($db);
    $lastShowData = $db -> estraiArray($misc->getTeuzLastShowDateQuery());
    
    $lastShow = mapLastShowData($lastShowData[0]);
    $body->lastShowDate = $lastShow;
    $response->body = $body;
    $response->status = 200;
    return $response;
}

function getMenu(){
    $db=new Connection();
	$db->connetti();
    $response = new ResponseObject();
    
    $misc = new Misc($db);
    $menuData = $db -> estraiArray($misc->getMenu());
    
    $menu = array_map('mapMenu', $menuData);
    $body->menu = $menu;
    $response->body = $body;
    $response->status = 200;
    return $response;
}

function mapLastShowData($l){
    $date->day = parseDay($l['DayWeek']) + ((parseWeek($l['Week']) - 1)*7);
    $date->dayWeek = parseDay($l['DayWeek']);
    $date->week = parseWeek($l['Week']);
    $date->month = parseMonth($l['Month']);
    $date->year = $l['Year'];
    return $date;
}

function parseDay($DayWeek){
    switch ($DayWeek) {
        case 'Lunedi':
            return 1;
            break;
        case 'Martedi':
            return 2;
            break;
        case 'Mercoledi':
            return 3;
            break;
        case 'Giovedi':
            return 4;
            break;
        case 'Venerdi':
            return 5;
            break;
        case 'Sabato':
            return 6;
            break;
        case 'Domenica':
            return 7;
            break;
    }
}
function parseWeek($week){
    switch ($week) {
        case 'Prima':
            return 1;
            break;
        case 'Seconda':
            return 2;
            break;
        case 'Terza':
            return 3;
            break;
        case 'Quarta':
            return 4;
            break;
    }
}
function parseMonth($month){
    switch ($month) {
        case 'Gennaio':
            return 1;
            break;
        case 'Febbraio':
            return 2;
            break;
        case 'Marzo':
            return 3;
            break;
        case 'Aprile':
            return 4;
            break;
        case 'Maggio':
            return 5;
            break;
        case 'Giugno':
            return 6;
            break;
        case 'Luglio':
            return 7;
            break;
        case 'Agosto':
            return 8;
            break;
        case 'Settembre':
            return 9;
            break;
        case 'Ottobre':
            return 10;
            break;
        case 'Novembre':
            return 11;
            break;
        case 'Dicembre':
            return 12;
            break;
    }
}

function mapMenu($m){
    $menu->iconText = $m['iconText'];
    $menu->actionKey = $m['actionKey'];
    $menu->usePath = $m['usePath'];
    $menu->actionKey = $m['actionKey'];
    $menu->label = $m['label'];
    $menu->Auth = $m['Auth'];
    $menu->Padre = $m['Padre'];
    $menu->Livello = $m['Livello'];
    $menu->Posizione = $m['Posizione'];

	return $menu;
}

function grabImage($targetDir, $workerImg, $holdTitle){
	//ARRAY CONTENENTE TUTTE LE VERSIONI DELL'IMMAGINE DELL'ATLETA
	if($holdTitle){
		$holdTitle = str_replace(" ", "", $holdTitle);
		$holdTitle = "_".$holdTitle.'Champ';
	}
	$files = glob($targetDir.$workerImg."*".$holdTitle.".*");
	if(count($files)==0){
		$files = glob($targetDir.$workerImg.".*");
	}
	$img = $workerImg."_2";
	$max = 100;
	for($k = 1; $k<$max; $k++){
		
		$checkText = $targetDir.$workerImg."_".$k.$holdTitle.".";
		if($k == 1){
			$checkText = $targetDir.$workerImg.$holdTitle.".";
		}
		$found = false;
		for($p = 0; $p < count($files); $p++){
			if(strpos($files[$p], $checkText) === 0){
				$img = $files[$p];
				$found = true;
			}
		}

		if(!$found && $max == 100){
			$max = $k + 4;
		}
		else if($found && $max == $max-1){
			$max = $max + 3;
		}
	}

	return $img;
}
?>