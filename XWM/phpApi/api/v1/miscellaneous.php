<?php
header('Access-Control-Allow-Origin: *', false);
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json; charset=utf-8');
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
    $targetDir = '../../../../DiaryDome/'.$targetDir;
	$files = glob($targetDir.$workerImg."*".$holdTitle.".*");
	if(count($files)==0){
        $files = glob($targetDir.$workerImg."*.*");
        $holdTitle = "";
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
	return str_replace($targetDir, "",$img);
}

function getVSUrl($userId){
    $targetDir = '../../../../DiaryDome/'.$userId."/Loghi/";
    //echo $targetDir;
    $image = "";
    $files = glob($targetDir."VS.*");
    $image = $files[0];
    for($k = 2; $k<100; $k++){
        $files = glob($targetDir."VS_".$k.".*");
        if(count($files)>0){
            $image = $files[0];
        }
        else{
            break;
        }
    }
    return str_replace($targetDir   , "",$image);
}

function getTitleList($userId){
    $targetDir = '../../../../DiaryDome/'.$userId."/Belts/";
    
    $image = "";
    $files = glob($targetDir."*");
    $images = $files;
    $imageRes = mapImageList($images, $targetDir);
    return $imageRes;
}

function mapImageList($img, $dir){
    $finalImage = [];
    for ($i=0; $i < count($img); $i++) { 
        array_push($finalImage, str_replace($dir   , "",$img[$i]));
    }
   return $finalImage;
}

function getUserWorkerList($userId){
    $targetDir = '../../../../DiaryDome/'.$userId."/";
    
    $image = "";
    $files = glob($targetDir."*");
    $images = $files;
    $imageRes = mapImageList($images, $targetDir);
    return $imageRes;
}

function titleHolded($title){
	$holdTitle = "";
    switch($title){
        case 'NXT':
            $holdTitle = $holdTitle."_NXTChamp";
            break;
        case 'NXT Network':
            $holdTitle = $holdTitle."_NXTNetworkChamp";
            break;
        case 'NXT Tag Team':
            $holdTitle = $holdTitle."_NXTTagTeamChamp";
            break;
        case 'NXT Women':
            $holdTitle = $holdTitle."_NXTWomenChamp";
            break;
        case 'WWE Cruiserweight':
            $holdTitle = $holdTitle."_CruiserweightChamp";
            break;
        case 'WWE HeavyWeight':
            $holdTitle = $holdTitle."_WWEChamp";
            break;
        case 'WWE Intercontinental':
            $holdTitle = $holdTitle."_IntercontinentalChamp";
            break;
        case 'WWE RAW Tag Team':
            $holdTitle = $holdTitle."_RAWTagTeamChamp";
            break;
        case 'WWE RAW Women':
            $holdTitle = $holdTitle."_RAWWomenChamp";
            break;
        case 'WWE SmackDown Tag Team':
            $holdTitle = $holdTitle."_SDTagTeamChamp";
            break;
        case 'WWE SmackDown Women':
            $holdTitle = $holdTitle."_SDWomenChamp";
            break;
        case 'WWE United Kingdom':
            $holdTitle = $holdTitle."_WWEUKChamp";
            break;
        case 'WWE United States':
            $holdTitle = $holdTitle."_USChamp";
            break;
        case 'WWE Universal':
            $holdTitle = $holdTitle."_UniversalChamp";
            break;
        case 'WWE Universal Women':
            $holdTitle = $holdTitle."_UniversalWomenChamp";
            break;
        case 'WWE Women Tag Team':
            $holdTitle = $holdTitle."_WomenTagTeamChamp";
            break;	
        case 'WWE Internet Women':
            $holdTitle = $holdTitle."_InternetWomenChamp";
            break;
        case 'WWE Cruiserweight Tag Team':
            $holdTitle = $holdTitle."_CruiserweightTagTeamChamp";
            break;
        case 'NXT European':
            $holdTitle = $holdTitle. '_NXTEuropean';
            break;
        case "NXT European Women's":
        case "NXT European Women":
            $holdTitle = $holdTitle. '_NXTEuropeanWomen';
            break;
        case 'NXT European Tag Team':
            $holdTitle = $holdTitle. '_NXTEuropeanTagTeam';
            break;
        case 'NXT Performance Center':
            $holdTitle = $holdTitle. '_NXTPerformanceCenter';
            break;
        case 'NXT Performance Center Women':
        case "NXT Performance Center Women's":
            $holdTitle = $holdTitle. '_NXTPerformanceCenterWomen';
            break;
        case 'NXT Performance Center Tag Team':
            $holdTitle = $holdTitle. '_NXTPerformanceCenterTagTeam';
            break;

    }
	return $holdTitle;
}
?>