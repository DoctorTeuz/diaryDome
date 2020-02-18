import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MatchGenerateService {

  constructor() { }

  matchStyleShort(segment, format){

    let soldOutColor = format.soldOutColor;
    let color1 = format.matchFirstBorderColor;
    let color2 = format.matchSecondBorderColor;

    let finalString;
  
    finalString = "<div style='width: 100%; text-align: left; border-width: 0px; background-color: rgba(0,0,0,0); " +
                  "color: white;'><b><u><font color='" + soldOutColor +"'>MATCH</font></u></b> - ";
  
    if(segment.championship){
      finalString = finalString + '<b>' + segment.championship + ' Championship</b><br>';
    }
    finalString = finalString + segment.matchType + ': <i>' + segment.matchScheme + '</i>';
  
    if(segment.content){
      finalString = finalString + '<br>' + segment.content;
    }
  
    finalString = finalString + '<br><u><b>';
  
    finalString = finalString + '';
    if(!segment.matchWinner){
      finalString = finalString + 'No Contest</b></i></u>';
    }
    else{
      if(!segment.championship){
        finalString = finalString + 'Winner</b></u>: ' + segment.matchWinner + '</i>';
      }
      else{
        if(segment.titleChange){
          finalString = finalString + 'Winner and new ' + segment.championship + 
                        ' Champion</b></u>: ' + segment.matchWinner + '</i>';
        }
        else{
          if(!segment.championshipAdv){
            finalString = finalString + 'Winner and still ' + segment.championship + 
                          ' Champion</b></u>: ' + segment.matchWinner + '</i>';
          }
          else{
            finalString = finalString + 'Winner</b></u>: ' + segment.matchWinner + '<br><b>But still ' + segment.championship + 
                          ' Champion</b></u>: ' + segment.champion + '</i>';
          }
        } 
      }
    }
  
    finalString = finalString + '</div>';
  
    return finalString;
  }
  
}


/**
 * 
 * 
 function matchStyle1($data, $val, $soldOutColor){

	$color1 = mysql_result($data, $val, 'matchFirstBorderColor');

	if(mysql_result($data, $val, 'Type') == 'SpecialMatch'){
		$color1 = mysql_result($data, $val, 'graphicColor');
	}

	$color2 = mysql_result($data, $val, 'matchSecondBorderColor');
	
	$workers = mysql_result($data, $val, 'Workers');


	$str = "";
	$str = $str.'<div align="center" style="width: 100%;"><div class="_top" style="font-size: 9px; height: auto;text-align: left;border: 0px;background: none;color: white; font-style: normal; text-align: justify; " align="left"><b>';

	if(mysql_result($data, $val, 'MatchTitle') != NULL){
		$str = $str.mysql_result($data, $val, 'MatchTitle')." Championship<br>";
	}
		
	$str = $str.mysql_result($data, $val, 'MatchType')."</b><br><i>".mysql_result($data, $val, 'MatchScheme')."</i></div>";

	$str = $str.'<div class="" align="center" style="background-color:#3D3B3A; border-radius: 20px; border:none; color: white; font-style: normal; text-align: justify; padding: 9px;"><center>';

	if(mysql_result($data, $val, 'MatchTitle') != NULL){
		$str = $str.findTitle(mysql_result($data, $val, 'MatchTitle'), mysql_result($data, $val, 'ID_Show'));
	}
	if(mysql_result($data, $val, 'MatchWorker') != ""){
		$matchWorker =  explode("|", mysql_result($data, $val, 'MatchWorker'));
		for($j=0; $j<count($matchWorker); $j++){
			$str = $str.createWorkerImageStyle($matchWorker[$j], mysql_result($data, $val, 'workerImageShape'), mysql_result($data, $val, 'ID_Show'), $soldOutColor);
		}
	}
	$str = $str.'</center><br>';

	$str = $str.mysql_result($data, $val, 'Content').'</div>';

	$str = $str.'<div class="_top" style="font-size: 9px; height: auto;text-align: right;border: 0px;background: none;color: white; font-style: normal" align="right"><i><b>';
	if(mysql_result($data, $val, 'MatchWinner') == NULL){
		$str = $str.'No Contest</b></i>';
	}
	else{
		if(mysql_result($data, $val, 'MatchTitle') == NULL){
			$str = $str.'Winner</b>: '.mysql_result($data, $val, 'MatchWinner').'</i>';
		}
		else{
			if(mysql_result($data, $val, 'TitleChange') == 1){
				$str = $str.'Winner and new '.mysql_result($data, $val, 'MatchTitle').' Champion</b>: '.mysql_result($data, $val, 'MatchWinner').'</i>';
			}
			else{
				if(mysql_result($data, $val, 'ChampionsAdvantage') == 0){
					$str = $str.'Winner and still '.mysql_result($data, $val, 'MatchTitle').' Champion</b>: '.mysql_result($data, $val, 'MatchWinner').'</i>';
				}
				else{
					$str = $str.'Winner</b>: '.mysql_result($data, $val, 'MatchWinner').'<br><b>But still '.mysql_result($data, $val, 'MatchTitle').' Champion</b>: '.mysql_result($data, $val, 'StartingChamp').'</i>';
				}
			} 
		}
	}

	$str = $str.'</div></div>';

	return $str;
}




function matchStyle16($data, $val, $soldOutColor){

	$color1 = mysql_result($data, $val, 'matchFirstBorderColor');
	if(mysql_result($data, $val, 'Type') == 'SpecialMatch'){
		$color1 = mysql_result($data, $val, 'graphicColor');
	}
	$color2 = mysql_result($data, $val, 'matchSecondBorderColor');
	
	$workers = mysql_result($data, $val, 'Workers');
	$fontColor = analyzeBGColor($color1);
	//$fontColor = '#FFFFFF';

	$str = "";
	$str = $str.'<div align="center" style="width: 100%;"><div class="_top" style="font-size: 9px; height: auto;text-align: left;border: 0px;background: none;color: white; font-style: normal; text-align: justify; " align="left"><b>';

	if(mysql_result($data, $val, 'MatchTitle') != NULL){
		$str = $str.mysql_result($data, $val, 'MatchTitle')." Championship<br>";
	}
		
	$str = $str.mysql_result($data, $val, 'MatchType')."</b><br><i>".mysql_result($data, $val, 'MatchScheme')."</i></div>";

	$str = $str.'<div class="" align="center" style="background-color:'.$color1.'; border-radius: 20px; border:none; color: '.$fontColor.'; font-style: normal; text-align: justify; padding: 9px;"><center>';

	if(mysql_result($data, $val, 'MatchTitle') != NULL){
		$str = $str.findTitle(mysql_result($data, $val, 'MatchTitle'), mysql_result($data, $val, 'ID_Show'));
	}
	if(mysql_result($data, $val, 'MatchWorker') != ""){
		$matchWorker =  explode("|", mysql_result($data, $val, 'MatchWorker'));
		for($j=0; $j<count($matchWorker); $j++){
			$str = $str.createWorkerImageStyle($matchWorker[$j], mysql_result($data, $val, 'workerImageShape'), mysql_result($data, $val, 'ID_Show'), $soldOutColor);
		}
	}
	$str = $str.'</center><br>';

	$str = $str.mysql_result($data, $val, 'Content').'</div>';

	$str = $str.'<div class="_top" style="font-size: 9px; height: auto;text-align: right;border: 0px;background: none;color: white; font-style: normal" align="right"><i><b>';
	if(mysql_result($data, $val, 'MatchWinner') == NULL){
		$str = $str.'No Contest</b></i>';
	}
	else{
		if(mysql_result($data, $val, 'MatchTitle') == NULL){
			$str = $str.'Winner</b>: '.mysql_result($data, $val, 'MatchWinner').'</i>';
		}
		else{
			if(mysql_result($data, $val, 'TitleChange') == 1){
				$str = $str.'Winner and new '.mysql_result($data, $val, 'MatchTitle').' Champion</b>: '.mysql_result($data, $val, 'MatchWinner').'</i>';
			}
			else{
				if(mysql_result($data, $val, 'ChampionsAdvantage') == 0){
					$str = $str.'Winner and still '.mysql_result($data, $val, 'MatchTitle').' Champion</b>: '.mysql_result($data, $val, 'MatchWinner').'</i>';
				}
				else{
					$str = $str.'Winner</b>: '.mysql_result($data, $val, 'MatchWinner').'<br><b>But still '.mysql_result($data, $val, 'MatchTitle').' Champion</b>: '.mysql_result($data, $val, 'StartingChamp').'</i>';
				}
			} 
		}
	}

	$str = $str.'</div></div>';

	return $str;
}

function matchStyle2($data, $val, $soldOutColor){

	$color1 = mysql_result($data, $val, 'matchFirstBorderColor');
	if(mysql_result($data, $val, 'Type') == 'SpecialMatch'){
		$color1 = mysql_result($data, $val, 'graphicColor');
	}
	$color2 = mysql_result($data, $val, 'matchSecondBorderColor');
	
	$workers = mysql_result($data, $val, 'Workers');


	$str = "";
	$str = $str.'<div align="center" style="width: 100%;"><div class="_top" style="font-size: 9px; height: auto;text-align: left;border: 0px;background: none;color: white; font-style: normal; text-align: justify; " align="left"><b>';

	if(mysql_result($data, $val, 'MatchTitle') != NULL){
		$str = $str.mysql_result($data, $val, 'MatchTitle')." Championship<br>";
	}
		
	$str = $str.mysql_result($data, $val, 'MatchType')."</b><br><i>".mysql_result($data, $val, 'MatchScheme')."</i></div>";

	$str = $str.'<div class="" align="center" style="border-radius: 20px; border:none; color: white; font-style: normal; text-align: justify; padding: 9px;"><center>';

	if(mysql_result($data, $val, 'MatchTitle') != NULL){
		$str = $str.findTitle(mysql_result($data, $val, 'MatchTitle'), mysql_result($data, $val, 'ID_Show'));
	}
	if(mysql_result($data, $val, 'MatchWorker') != ""){
		$matchWorker =  explode("|", mysql_result($data, $val, 'MatchWorker'));
		for($j=0; $j<count($matchWorker); $j++){
			$str = $str.createWorkerImageStyle($matchWorker[$j], mysql_result($data, $val, 'workerImageShape'), mysql_result($data, $val, 'ID_Show'), $soldOutColor);
		}
	}
	$str = $str.'</center><br>';

	$str = $str.mysql_result($data, $val, 'Content').'</div>';

	$str = $str.'<div class="_top" style="font-size: 9px; height: auto;text-align: right;border: 0px;background: none;color: white; font-style: normal" align="right"><i><b>';
	if(mysql_result($data, $val, 'MatchWinner') == NULL){
		$str = $str.'No Contest</b></i>';
	}
	else{
		if(mysql_result($data, $val, 'MatchTitle') == NULL){
			$str = $str.'Winner</b>: '.mysql_result($data, $val, 'MatchWinner').'</i>';
		}
		else{
			if(mysql_result($data, $val, 'TitleChange') == 1){
				$str = $str.'Winner and new '.mysql_result($data, $val, 'MatchTitle').' Champion</b>: '.mysql_result($data, $val, 'MatchWinner').'</i>';
			}
			else{
				if(mysql_result($data, $val, 'ChampionsAdvantage') == 0){
					$str = $str.'Winner and still '.mysql_result($data, $val, 'MatchTitle').' Champion</b>: '.mysql_result($data, $val, 'MatchWinner').'</i>';
				}
				else{
					$str = $str.'Winner</b>: '.mysql_result($data, $val, 'MatchWinner').'<br><b>But still '.mysql_result($data, $val, 'MatchTitle').' Champion</b>: '.mysql_result($data, $val, 'StartingChamp').'</i>';
				}
			} 
		}
	}

	$str = $str.'</div></div>';

	return $str;
}

function matchStyle3($data, $val, $soldOutColor){

	$color1 = mysql_result($data, $val, 'matchFirstBorderColor');
	if(mysql_result($data, $val, 'Type') == 'SpecialMatch'){
		$color1 = mysql_result($data, $val, 'graphicColor');
	}
	$color2 = mysql_result($data, $val, 'matchSecondBorderColor');
	
	$workers = mysql_result($data, $val, 'Workers');


	$str = "";
	$str = $str.'<div align="center" style="width: 100%;"><div class="_top" style="font-size: 9px; height: auto;text-align: left;border: 0px;background: none;color: white; font-style: normal; text-align: justify; " align="left"><b>';

	if(mysql_result($data, $val, 'MatchTitle') != NULL){
		$str = $str.mysql_result($data, $val, 'MatchTitle')." Championship<br>";
	}
		
	$str = $str.mysql_result($data, $val, 'MatchType')."</b><br><i>".mysql_result($data, $val, 'MatchScheme')."</i></div>";

	$str = $str.'<div class="" align="center" style="background-color:#3D3B3A; border-radius: 20px; border:none; color: white; font-style: normal; text-align: justify; padding: 9px;">';

	$str = $str.mysql_result($data, $val, 'Content').'</div>';

	$str = $str.'<div class="_top" style="font-size: 9px; height: auto;text-align: right;border: 0px;background: none;color: white; font-style: normal" align="right"><i><b>';
	if(mysql_result($data, $val, 'MatchWinner') == NULL){
		$str = $str.'No Contest</b></i>';
	}
	else{
		if(mysql_result($data, $val, 'MatchTitle') == NULL){
			$str = $str.'Winner</b>: '.mysql_result($data, $val, 'MatchWinner').'</i>';
		}
		else{
			if(mysql_result($data, $val, 'TitleChange') == 1){
				$str = $str.'Winner and new '.mysql_result($data, $val, 'MatchTitle').' Champion</b>: '.mysql_result($data, $val, 'MatchWinner').'</i>';
			}
			else{
				if(mysql_result($data, $val, 'ChampionsAdvantage') == 0){
					$str = $str.'Winner and still '.mysql_result($data, $val, 'MatchTitle').' Champion</b>: '.mysql_result($data, $val, 'MatchWinner').'</i>';
				}
				else{
					$str = $str.'Winner</b>: '.mysql_result($data, $val, 'MatchWinner').'<br><b>But still '.mysql_result($data, $val, 'MatchTitle').' Champion</b>: '.mysql_result($data, $val, 'StartingChamp').'</i>';
				}
			} 
		}
	}

	$str = $str.'</div></div>';

	return $str;
}

function matchStyle4($data, $val, $soldOutColor){

	$color1 = mysql_result($data, $val, 'matchFirstBorderColor');
	if(mysql_result($data, $val, 'Type') == 'SpecialMatch'){
		$color1 = mysql_result($data, $val, 'graphicColor');
	}
	$color2 = mysql_result($data, $val, 'matchSecondBorderColor');
	
	$workers = mysql_result($data, $val, 'Workers');


	$str = "";
	$str = $str.'<div align="center" style="width: 100%;"><div class="_top" style="font-size: 9px; height: auto;text-align: left;border: 0px;background: none;color: white; font-style: normal; text-align: justify; " align="left"><b>';

	if(mysql_result($data, $val, 'MatchTitle') != NULL){
		$str = $str.mysql_result($data, $val, 'MatchTitle')." Championship<br>";
	}
		
	$str = $str.mysql_result($data, $val, 'MatchType')."</b><br><i>".mysql_result($data, $val, 'MatchScheme')."</i></div>";

	$str = $str.'<div class="" align="center" style="border-radius: 20px; border:none; color: white; font-style: normal; text-align: justify; padding: 9px;">';

	$str = $str.mysql_result($data, $val, 'Content').'</div>';

	$str = $str.'<div class="_top" style="font-size: 9px; height: auto;text-align: right;border: 0px;background: none;color: white; font-style: normal" align="right"><i><b>';
	if(mysql_result($data, $val, 'MatchWinner') == NULL){
		$str = $str.'No Contest</b></i>';
	}
	else{
		if(mysql_result($data, $val, 'MatchTitle') == NULL){
			$str = $str.'Winner</b>: '.mysql_result($data, $val, 'MatchWinner').'</i>';
		}
		else{
			if(mysql_result($data, $val, 'TitleChange') == 1){
				$str = $str.'Winner and new '.mysql_result($data, $val, 'MatchTitle').' Champion</b>: '.mysql_result($data, $val, 'MatchWinner').'</i>';
			}
			else{
				if(mysql_result($data, $val, 'ChampionsAdvantage') == 0){
					$str = $str.'Winner and still '.mysql_result($data, $val, 'MatchTitle').' Champion</b>: '.mysql_result($data, $val, 'MatchWinner').'</i>';
				}
				else{
					$str = $str.'Winner</b>: '.mysql_result($data, $val, 'MatchWinner').'<br><b>But still '.mysql_result($data, $val, 'MatchTitle').' Champion</b>: '.mysql_result($data, $val, 'StartingChamp').'</i>';
				}
			} 
		}
	}

	$str = $str.'</div></div>';

	return $str;
}

function matchStyle5($data, $val, $soldOutColor){

	$color1 = mysql_result($data, $val, 'matchFirstBorderColor');
	if(mysql_result($data, $val, 'Type') == 'SpecialMatch'){
		$color1 = mysql_result($data, $val, 'graphicColor');
	}
	$color2 = mysql_result($data, $val, 'matchSecondBorderColor');
	
	$workers = mysql_result($data, $val, 'Workers');


	$str = "";
	$str = $str.'<div align="center" style="width: 100%;"><div class="_top" style="font-size: 9px; height: auto;text-align: left;border: 0px;background: none;color: white; font-style: normal; text-align: justify; " align="left"><b>';

	if(mysql_result($data, $val, 'MatchTitle') != NULL){
		$str = $str.mysql_result($data, $val, 'MatchTitle')." Championship<br>";
	}
		
	$str = $str.mysql_result($data, $val, 'MatchType')."</b><br><i>".mysql_result($data, $val, 'MatchScheme')."</i></div>";

	$str = $str.'<div class=" MatchSegmentBorderOne" align="center" style="background-color:#3D3B3A; border-radius: 20px; border:none; color: white; font-style: normal; text-align: justify; padding: 9px; border-style: solid; border-width: 2px; border-color: '.$color1.';"><center>';

	if(mysql_result($data, $val, 'MatchTitle') != NULL){
		$str = $str.findTitle(mysql_result($data, $val, 'MatchTitle'), mysql_result($data, $val, 'ID_Show'));
	}
	if(mysql_result($data, $val, 'MatchWorker') != ""){
		$matchWorker =  explode("|", mysql_result($data, $val, 'MatchWorker'));
		for($j=0; $j<count($matchWorker); $j++){
			$str = $str.createWorkerImageStyle($matchWorker[$j], mysql_result($data, $val, 'workerImageShape'), mysql_result($data, $val, 'ID_Show'), $soldOutColor);
		}
	}
	$str = $str.'</center><br>';

	$str = $str.mysql_result($data, $val, 'Content').'</div>';

	$str = $str.'<div class="_top" style="font-size: 9px; height: auto;text-align: right;border: 0px;background: none;color: white; font-style: normal" align="right"><i><b>';
	if(mysql_result($data, $val, 'MatchWinner') == NULL){
		$str = $str.'No Contest</b></i>';
	}
	else{
		if(mysql_result($data, $val, 'MatchTitle') == NULL){
			$str = $str.'Winner</b>: '.mysql_result($data, $val, 'MatchWinner').'</i>';
		}
		else{
			if(mysql_result($data, $val, 'TitleChange') == 1){
				$str = $str.'Winner and new '.mysql_result($data, $val, 'MatchTitle').' Champion</b>: '.mysql_result($data, $val, 'MatchWinner').'</i>';
			}
			else{
				if(mysql_result($data, $val, 'ChampionsAdvantage') == 0){
					$str = $str.'Winner and still '.mysql_result($data, $val, 'MatchTitle').' Champion</b>: '.mysql_result($data, $val, 'MatchWinner').'</i>';
				}
				else{
					$str = $str.'Winner</b>: '.mysql_result($data, $val, 'MatchWinner').'<br><b>But still '.mysql_result($data, $val, 'MatchTitle').' Champion</b>: '.mysql_result($data, $val, 'StartingChamp').'</i>';
				}
			} 
		}
	}

	$str = $str.'</div></div>';

	return $str;
}

function matchStyle6($data, $val, $soldOutColor){

	$color1 = mysql_result($data, $val, 'matchFirstBorderColor');
	if(mysql_result($data, $val, 'Type') == 'SpecialMatch'){
		$color1 = mysql_result($data, $val, 'graphicColor');
	}
	$color2 = mysql_result($data, $val, 'matchSecondBorderColor');
	
	$workers = mysql_result($data, $val, 'Workers');


	$str = "";
	$str = $str.'<div align="center" style="width: 100%;"><div class="_top" style="font-size: 9px; height: auto;text-align: left;border: 0px;background: none;color: white; font-style: normal; text-align: justify; " align="left"><b>';

	if(mysql_result($data, $val, 'MatchTitle') != NULL){
		$str = $str.mysql_result($data, $val, 'MatchTitle')." Championship<br>";
	}
		
	$str = $str.mysql_result($data, $val, 'MatchType')."</b><br><i>".mysql_result($data, $val, 'MatchScheme')."</i></div>";

	$str = $str.'<div class=" MatchSegmentBorderOne" align="center" style="border-radius: 20px; border:none; color: white; font-style: normal; text-align: justify; padding: 9px; border-style: solid; border-width: 2px; border-color: '.$color1.';"><center>';

	if(mysql_result($data, $val, 'MatchTitle') != NULL){
		$str = $str.findTitle(mysql_result($data, $val, 'MatchTitle'), mysql_result($data, $val, 'ID_Show'));
	}
	$matchWorker = $workerData = explode("|", mysql_result($data, $val, 'MatchWorker'));
	if(mysql_result($data, $val, 'MatchWorker') != ""){
		$matchWorker =  explode("|", mysql_result($data, $val, 'MatchWorker'));
		for($j=0; $j<count($matchWorker); $j++){
			$str = $str.createWorkerImageStyle($matchWorker[$j], mysql_result($data, $val, 'workerImageShape'), mysql_result($data, $val, 'ID_Show'), $soldOutColor);
		}
	}
	$str = $str.'</center><br>';

	$str = $str.mysql_result($data, $val, 'Content').'</div>';

	$str = $str.'<div class="_top" style="font-size: 9px; height: auto;text-align: right;border: 0px;background: none;color: white; font-style: normal" align="right"><i><b>';
	if(mysql_result($data, $val, 'MatchWinner') == NULL){
		$str = $str.'No Contest</b></i>';
	}
	else{
		if(mysql_result($data, $val, 'MatchTitle') == NULL){
			$str = $str.'Winner</b>: '.mysql_result($data, $val, 'MatchWinner').'</i>';
		}
		else{
			if(mysql_result($data, $val, 'TitleChange') == 1){
				$str = $str.'Winner and new '.mysql_result($data, $val, 'MatchTitle').' Champion</b>: '.mysql_result($data, $val, 'MatchWinner').'</i>';
			}
			else{
				if(mysql_result($data, $val, 'ChampionsAdvantage') == 0){
					$str = $str.'Winner and still '.mysql_result($data, $val, 'MatchTitle').' Champion</b>: '.mysql_result($data, $val, 'MatchWinner').'</i>';
				}
				else{
					$str = $str.'Winner</b>: '.mysql_result($data, $val, 'MatchWinner').'<br><b>But still '.mysql_result($data, $val, 'MatchTitle').' Champion</b>: '.mysql_result($data, $val, 'StartingChamp').'</i>';
				}
			} 
		}
	}

	$str = $str.'</div></div>';

	return $str;
}

function matchStyle7($data, $val, $soldOutColor){

	$color1 = mysql_result($data, $val, 'matchFirstBorderColor');
	if(mysql_result($data, $val, 'Type') == 'SpecialMatch'){
		$color1 = mysql_result($data, $val, 'graphicColor');
	}
	$color2 = mysql_result($data, $val, 'matchSecondBorderColor');
	
	$workers = mysql_result($data, $val, 'Workers');


	$str = "";
	$str = $str.'<div align="center" style="width: 100%;"><div class="_top" style="font-size: 9px; height: auto;text-align: left;border: 0px;background: none;color: white; font-style: normal; text-align: justify; " align="left"><b>';

	if(mysql_result($data, $val, 'MatchTitle') != NULL){
		$str = $str.mysql_result($data, $val, 'MatchTitle')." Championship<br>";
	}
		
	$str = $str.mysql_result($data, $val, 'MatchType')."</b><br><i>".mysql_result($data, $val, 'MatchScheme')."</i></div>";

	$str = $str.'<div class=" MatchSegmentBorderOne" align="center" style="background-color:#3D3B3A; border-radius: 20px; border:none; color: white; font-style: normal; text-align: justify; padding: 9px; border-style: solid; border-width: 2px; border-color: '.$color1.';">';

	$str = $str.mysql_result($data, $val, 'Content').'</div>';

	$str = $str.'<div class="_top" style="font-size: 9px; height: auto;text-align: right;border: 0px;background: none;color: white; font-style: normal" align="right"><i><b>';
	if(mysql_result($data, $val, 'MatchWinner') == NULL){
		$str = $str.'No Contest</b></i>';
	}
	else{
		if(mysql_result($data, $val, 'MatchTitle') == NULL){
			$str = $str.'Winner</b>: '.mysql_result($data, $val, 'MatchWinner').'</i>';
		}
		else{
			if(mysql_result($data, $val, 'TitleChange') == 1){
				$str = $str.'Winner and new '.mysql_result($data, $val, 'MatchTitle').' Champion</b>: '.mysql_result($data, $val, 'MatchWinner').'</i>';
			}
			else{
				if(mysql_result($data, $val, 'ChampionsAdvantage') == 0){
					$str = $str.'Winner and still '.mysql_result($data, $val, 'MatchTitle').' Champion</b>: '.mysql_result($data, $val, 'MatchWinner').'</i>';
				}
				else{
					$str = $str.'Winner</b>: '.mysql_result($data, $val, 'MatchWinner').'<br><b>But still '.mysql_result($data, $val, 'MatchTitle').' Champion</b>: '.mysql_result($data, $val, 'StartingChamp').'</i>';
				}
			} 
		}
	}

	$str = $str.'</div></div>';

	return $str;
}

function matchStyle8($data, $val, $soldOutColor){

	$color1 = mysql_result($data, $val, 'matchFirstBorderColor');
	if(mysql_result($data, $val, 'Type') == 'SpecialMatch'){
		$color1 = mysql_result($data, $val, 'graphicColor');
	}
	$color2 = mysql_result($data, $val, 'matchSecondBorderColor');
	
	$workers = mysql_result($data, $val, 'Workers');


	$str = "";
	$str = $str.'<div align="center" style="width: 100%;"><div class="_top" style="font-size: 9px; height: auto;text-align: left;border: 0px;background: none;color: white; font-style: normal; text-align: justify; " align="left"><b>';

	if(mysql_result($data, $val, 'MatchTitle') != NULL){
		$str = $str.mysql_result($data, $val, 'MatchTitle')." Championship<br>";
	}
		
	$str = $str.mysql_result($data, $val, 'MatchType')."</b><br><i>".mysql_result($data, $val, 'MatchScheme')."</i></div>";

	$str = $str.'<div class=" MatchSegmentBorderOne" align="center" style="border-radius: 20px; border:none; color: white; font-style: normal; text-align: justify; padding: 9px; border-style: solid; border-width: 2px; border-color: '.$color1.';">';

	$str = $str.mysql_result($data, $val, 'Content').'</div>';

	$str = $str.'<div class="_top" style="font-size: 9px; height: auto;text-align: right;border: 0px;background: none;color: white; font-style: normal" align="right"><i><b>';
	if(mysql_result($data, $val, 'MatchWinner') == NULL){
		$str = $str.'No Contest</b></i>';
	}
	else{
		if(mysql_result($data, $val, 'MatchTitle') == NULL){
			$str = $str.'Winner</b>: '.mysql_result($data, $val, 'MatchWinner').'</i>';
		}
		else{
			if(mysql_result($data, $val, 'TitleChange') == 1){
				$str = $str.'Winner and new '.mysql_result($data, $val, 'MatchTitle').' Champion</b>: '.mysql_result($data, $val, 'MatchWinner').'</i>';
			}
			else{
				if(mysql_result($data, $val, 'ChampionsAdvantage') == 0){
					$str = $str.'Winner and still '.mysql_result($data, $val, 'MatchTitle').' Champion</b>: '.mysql_result($data, $val, 'MatchWinner').'</i>';
				}
				else{
					$str = $str.'Winner</b>: '.mysql_result($data, $val, 'MatchWinner').'<br><b>But still '.mysql_result($data, $val, 'MatchTitle').' Champion</b>: '.mysql_result($data, $val, 'StartingChamp').'</i>';
				}
			} 
		}
	}

	$str = $str.'</div></div>';

	return $str;
}

function matchStyle9($data, $val, $soldOutColor){

	$color1 = mysql_result($data, $val, 'matchFirstBorderColor');
	if(mysql_result($data, $val, 'Type') == 'SpecialMatch'){
		$color1 = mysql_result($data, $val, 'graphicColor');
	}
	$color2 = mysql_result($data, $val, 'matchSecondBorderColor');
	
	$workers = mysql_result($data, $val, 'Workers');


	$str = "";
	$str = $str.'<div align="center" style="width: 100%;"><div class="_top" style="font-size: 9px; height: auto;text-align: left;border: 0px;background: none;color: white; font-style: normal; text-align: justify; " align="left"><b>';

	if(mysql_result($data, $val, 'MatchTitle') != NULL){
		$str = $str.mysql_result($data, $val, 'MatchTitle')." Championship<br>";
	}
		
	$str = $str.mysql_result($data, $val, 'MatchType')."</b><br><i>".mysql_result($data, $val, 'MatchScheme')."</i></div>";

	$str = $str.'<div class=" MatchSegmentBorderOne" align="center" style="background-color:#3D3B3A; border-radius: 20px; border:none; color: white; font-style: normal; text-align: justify; padding: 9px; border-style: solid; border-width: 2px; border-color: '.$color1.';">';

	$str = $str.'<div class=" MatchSegmentBorderTwo" align="center" style="border-radius: 20px; color: white; font-style: normal; text-align: justify; padding: 9px; border-style: solid; border-width: 2px; border-color: '.$color2.'; margin-left: 30px; margin-right: 30px;"><center>';

	if(mysql_result($data, $val, 'MatchTitle') != NULL){
		$str = $str.findTitle(mysql_result($data, $val, 'MatchTitle'), mysql_result($data, $val, 'ID_Show'));
	}
	if(mysql_result($data, $val, 'MatchWorker') != ""){
		$matchWorker =  explode("|", mysql_result($data, $val, 'MatchWorker'));
		for($j=0; $j<count($matchWorker); $j++){
			$str = $str.createWorkerImageStyle($matchWorker[$j], mysql_result($data, $val, 'workerImageShape'), mysql_result($data, $val, 'ID_Show'), $soldOutColor);
		}
	}
	$str = $str.'</center></div><br>';

	$str = $str.mysql_result($data, $val, 'Content').'</div>';

	$str = $str.'<div class="_top" style="font-size: 9px; height: auto;text-align: right;border: 0px;background: none;color: white; font-style: normal" align="right"><i><b>';
	if(mysql_result($data, $val, 'MatchWinner') == NULL){
		$str = $str.'No Contest</b></i>';
	}
	else{
		if(mysql_result($data, $val, 'MatchTitle') == NULL){
			$str = $str.'Winner</b>: '.mysql_result($data, $val, 'MatchWinner').'</i>';
		}
		else{
			if(mysql_result($data, $val, 'TitleChange') == 1){
				$str = $str.'Winner and new '.mysql_result($data, $val, 'MatchTitle').' Champion</b>: '.mysql_result($data, $val, 'MatchWinner').'</i>';
			}
			else{
				if(mysql_result($data, $val, 'ChampionsAdvantage') == 0){
					$str = $str.'Winner and still '.mysql_result($data, $val, 'MatchTitle').' Champion</b>: '.mysql_result($data, $val, 'MatchWinner').'</i>';
				}
				else{
					$str = $str.'Winner</b>: '.mysql_result($data, $val, 'MatchWinner').'<br><b>But still '.mysql_result($data, $val, 'MatchTitle').' Champion</b>: '.mysql_result($data, $val, 'StartingChamp').'</i>';
				}
			} 
		}
	}

	$str = $str.'</div></div>';

	return $str;
}

function matchStyle10($data, $val, $soldOutColor){

	$color1 = mysql_result($data, $val, 'matchFirstBorderColor');
	if(mysql_result($data, $val, 'Type') == 'SpecialMatch'){
		$color1 = mysql_result($data, $val, 'graphicColor');
	}
	$color2 = mysql_result($data, $val, 'matchSecondBorderColor');
	
	$workers = mysql_result($data, $val, 'Workers');


	$str = "";
	$str = $str.'<div align="center" style="width: 100%;"><div class="_top" style="font-size: 9px; height: auto;text-align: left;border: 0px;background: none;color: white; font-style: normal; text-align: justify; " align="left"><b>';

	if(mysql_result($data, $val, 'MatchTitle') != NULL){
		$str = $str.mysql_result($data, $val, 'MatchTitle')." Championship<br>";
	}
		
	$str = $str.mysql_result($data, $val, 'MatchType')."</b><br><i>".mysql_result($data, $val, 'MatchScheme')."</i></div>";

	$str = $str.'<div class=" MatchSegmentBorderOne" align="center" style="border-radius: 20px; border:none; color: white; font-style: normal; text-align: justify; padding: 9px; border-style: solid; border-width: 2px; border-color: '.$color1.';">';

	$str = $str.'<div class=" MatchSegmentBorderTwo" align="center" style="border-radius: 20px; color: white; font-style: normal; text-align: justify; padding: 9px; border-style: solid; border-width: 2px; border-color: '.$color2.'; margin-left: 30px; margin-right: 30px;"><center>';

	if(mysql_result($data, $val, 'MatchTitle') != NULL){
		$str = $str.findTitle(mysql_result($data, $val, 'MatchTitle'), mysql_result($data, $val, 'ID_Show'));
	}
	if(mysql_result($data, $val, 'MatchWorker') != ""){
		$matchWorker =  explode("|", mysql_result($data, $val, 'MatchWorker'));
		for($j=0; $j<count($matchWorker); $j++){
			$str = $str.createWorkerImageStyle($matchWorker[$j], mysql_result($data, $val, 'workerImageShape'), mysql_result($data, $val, 'ID_Show'), $soldOutColor);
		}
	}
	$str = $str.'</center></div><br>';

	$str = $str.mysql_result($data, $val, 'Content').'</div>';

	$str = $str.'<div class="_top" style="font-size: 9px; height: auto;text-align: right;border: 0px;background: none;color: white; font-style: normal" align="right"><i><b>';
	if(mysql_result($data, $val, 'MatchWinner') == NULL){
		$str = $str.'No Contest</b></i>';
	}
	else{
		if(mysql_result($data, $val, 'MatchTitle') == NULL){
			$str = $str.'Winner</b>: '.mysql_result($data, $val, 'MatchWinner').'</i>';
		}
		else{
			if(mysql_result($data, $val, 'TitleChange') == 1){
				$str = $str.'Winner and new '.mysql_result($data, $val, 'MatchTitle').' Champion</b>: '.mysql_result($data, $val, 'MatchWinner').'</i>';
			}
			else{
				if(mysql_result($data, $val, 'ChampionsAdvantage') == 0){
					$str = $str.'Winner and still '.mysql_result($data, $val, 'MatchTitle').' Champion</b>: '.mysql_result($data, $val, 'MatchWinner').'</i>';
				}
				else{
					$str = $str.'Winner</b>: '.mysql_result($data, $val, 'MatchWinner').'<br><b>But still '.mysql_result($data, $val, 'MatchTitle').' Champion</b>: '.mysql_result($data, $val, 'StartingChamp').'</i>';
				}
			} 
		}
	}

	$str = $str.'</div></div>';

	return $str;
}

function matchStyle11($data, $val, $soldOutColor){

	$color1 = mysql_result($data, $val, 'matchFirstBorderColor');
	if(mysql_result($data, $val, 'Type') == 'SpecialMatch'){
		$color1 = mysql_result($data, $val, 'graphicColor');
	}
	$color2 = mysql_result($data, $val, 'matchSecondBorderColor');
	
	$workers = mysql_result($data, $val, 'Workers');


	$str = "";
	$str = $str.'<div align="center" style="width: 100%;"><div class="_top" style="font-size: 9px; height: auto;text-align: left;border: 0px;background: none;color: white; font-style: normal; text-align: justify; " align="left"><b>';

	if(mysql_result($data, $val, 'MatchTitle') != NULL){
		$str = $str.mysql_result($data, $val, 'MatchTitle')." Championship<br>";
	}
		
	$str = $str.mysql_result($data, $val, 'MatchType')."</b><br><i>".mysql_result($data, $val, 'MatchScheme')."</i></div>";

	$str = $str.'<div class=" MatchSegmentBorderOne" align="center" style="background-color:#3D3B3A; border-radius: 20px; border:none; color: white; font-style: normal; text-align: justify; padding: 9px;">';

	$str = $str.'<div class=" MatchSegmentBorderTwo" align="center" style="border-radius: 20px; color: white; font-style: normal; text-align: justify; padding: 9px; border-style: solid; border-width: 2px; border-color: '.$color2.'; margin-left: 20px; margin-right: 20px;"><center>';

	if(mysql_result($data, $val, 'MatchTitle') != NULL){
		$str = $str.findTitle(mysql_result($data, $val, 'MatchTitle'), mysql_result($data, $val, 'ID_Show'));
	}
	if(mysql_result($data, $val, 'MatchWorker') != ""){
		$matchWorker =  explode("|", mysql_result($data, $val, 'MatchWorker'));
		for($j=0; $j<count($matchWorker); $j++){
			$str = $str.createWorkerImageStyle($matchWorker[$j], mysql_result($data, $val, 'workerImageShape'), mysql_result($data, $val, 'ID_Show'), $soldOutColor);
		}
	}
	$str = $str.'</center></div><br>';

	$str = $str.mysql_result($data, $val, 'Content').'</div>';

	$str = $str.'<div class="_top" style="font-size: 9px; height: auto;text-align: right;border: 0px;background: none;color: white; font-style: normal" align="right"><i><b>';
	if(mysql_result($data, $val, 'MatchWinner') == NULL){
		$str = $str.'No Contest</b></i>';
	}
	else{
		if(mysql_result($data, $val, 'MatchTitle') == NULL){
			$str = $str.'Winner</b>: '.mysql_result($data, $val, 'MatchWinner').'</i>';
		}
		else{
			if(mysql_result($data, $val, 'TitleChange') == 1){
				$str = $str.'Winner and new '.mysql_result($data, $val, 'MatchTitle').' Champion</b>: '.mysql_result($data, $val, 'MatchWinner').'</i>';
			}
			else{
				if(mysql_result($data, $val, 'ChampionsAdvantage') == 0){
					$str = $str.'Winner and still '.mysql_result($data, $val, 'MatchTitle').' Champion</b>: '.mysql_result($data, $val, 'MatchWinner').'</i>';
				}
				else{
					$str = $str.'Winner</b>: '.mysql_result($data, $val, 'MatchWinner').'<br><b>But still '.mysql_result($data, $val, 'MatchTitle').' Champion</b>: '.mysql_result($data, $val, 'StartingChamp').'</i>';
				}
			} 
		}
	}

	$str = $str.'</div></div>';

	return $str;
}

function matchStyle12($data, $val, $soldOutColor){

	$color1 = mysql_result($data, $val, 'matchFirstBorderColor');
	if(mysql_result($data, $val, 'Type') == 'SpecialMatch'){
		$color1 = mysql_result($data, $val, 'graphicColor');
	}
	$color2 = mysql_result($data, $val, 'matchSecondBorderColor');
	
	$workers = mysql_result($data, $val, 'Workers');


	$str = "";
	$str = $str.'<div align="center" style="width: 100%;"><div class="_top" style="font-size: 9px; height: auto;text-align: left;border: 0px;background: none;color: white; font-style: normal; text-align: justify; " align="left"><b>';

	if(mysql_result($data, $val, 'MatchTitle') != NULL){
		$str = $str.mysql_result($data, $val, 'MatchTitle')." Championship<br>";
	}
		
	$str = $str.mysql_result($data, $val, 'MatchType')."</b><br><i>".mysql_result($data, $val, 'MatchScheme')."</i></div>";

	$str = $str.'<div class=" MatchSegmentBorderOne" align="center" style="border-radius: 20px; border:none; color: white; font-style: normal; text-align: justify; padding: 9px;">';

	$str = $str.'<div class=" MatchSegmentBorderTwo" align="center" style="border-radius: 20px; color: white; font-style: normal; text-align: justify; padding: 9px; border-style: solid; border-width: 2px; border-color: '.$color2.'; margin-left: 20px; margin-right: 20px;"><center>';

	if(mysql_result($data, $val, 'MatchTitle') != NULL){
		$str = $str.findTitle(mysql_result($data, $val, 'MatchTitle'), mysql_result($data, $val, 'ID_Show'));
	}
	if(mysql_result($data, $val, 'MatchWorker') != ""){
		$matchWorker =  explode("|", mysql_result($data, $val, 'MatchWorker'));
		for($j=0; $j<count($matchWorker); $j++){
			$str = $str.createWorkerImageStyle($matchWorker[$j], mysql_result($data, $val, 'workerImageShape'), mysql_result($data, $val, 'ID_Show'), $soldOutColor);
		}
	}
	$str = $str.'</center></div><br>';

	$str = $str.mysql_result($data, $val, 'Content').'</div>';

	$str = $str.'<div class="_top" style="font-size: 9px; height: auto;text-align: right;border: 0px;background: none;color: white; font-style: normal" align="right"><i><b>';
	if(mysql_result($data, $val, 'MatchWinner') == NULL){
		$str = $str.'No Contest</b></i>';
	}
	else{
		if(mysql_result($data, $val, 'MatchTitle') == NULL){
			$str = $str.'Winner</b>: '.mysql_result($data, $val, 'MatchWinner').'</i>';
		}
		else{
			if(mysql_result($data, $val, 'TitleChange') == 1){
				$str = $str.'Winner and new '.mysql_result($data, $val, 'MatchTitle').' Champion</b>: '.mysql_result($data, $val, 'MatchWinner').'</i>';
			}
			else{
				if(mysql_result($data, $val, 'ChampionsAdvantage') == 0){
					$str = $str.'Winner and still '.mysql_result($data, $val, 'MatchTitle').' Champion</b>: '.mysql_result($data, $val, 'MatchWinner').'</i>';
				}
				else{
					$str = $str.'Winner</b>: '.mysql_result($data, $val, 'MatchWinner').'<br><b>But still '.mysql_result($data, $val, 'MatchTitle').' Champion</b>: '.mysql_result($data, $val, 'StartingChamp').'</i>';
				}
			} 
		}
	}

	$str = $str.'</div></div>';

	return $str;
}


function matchStyle13($data, $val, $soldOutColor){

	$color1 = mysql_result($data, $val, 'matchFirstBorderColor');
	if(mysql_result($data, $val, 'Type') == 'SpecialMatch'){
		$color1 = mysql_result($data, $val, 'graphicColor');
	}
	$color2 = mysql_result($data, $val, 'matchSecondBorderColor');
	
	$workers = mysql_result($data, $val, 'Workers');

	$str = "";
	//$str = $str.'<div align="center" style="width: 100%;">';

	//$str = $str.'<div class=" MatchSegmentBorderOne" align="center" style="border-radius: 20px; border:none; color: white; font-style: normal; text-align: justify; padding: 9px;"><center>';
	$str = $str.'<center>';

	if(mysql_result($data, $val, 'MatchWorker') != ""){
		$matchWorker =  explode("|", mysql_result($data, $val, 'MatchWorker'));
		for($j=0; $j<count($matchWorker); $j++){
			$str = $str.createWorkerImageStyle($matchWorker[$j], mysql_result($data, $val, 'workerImageShape'), mysql_result($data, $val, 'ID_Show'), $soldOutColor);
		}
	}

	if(mysql_result($data, $val, 'MatchTitle') != NULL){
		$str = $str.'<br><b>'.mysql_result($data, $val, 'MatchTitle').' Championship</b>';
	}
	$str = $str."<br>".mysql_result($data, $val, 'MatchType').'<br><u>'.mysql_result($data, $val, 'MatchScheme').'</u>';
	$str = $str.'</center>';

	$str = $str.mysql_result($data, $val, 'Content').'<br><u><b>';

	$str = $str.'';
	if(mysql_result($data, $val, 'MatchWinner') == NULL){
		$str = $str.'No Contest</b></i></u>';
	}
	else{
		if(mysql_result($data, $val, 'MatchTitle') == NULL){
			$str = $str.'Winner</b></u>: '.mysql_result($data, $val, 'MatchWinner').'</i>';
		}
		else{
			if(mysql_result($data, $val, 'TitleChange') == 1){
				$str = $str.'Winner and new '.mysql_result($data, $val, 'MatchTitle').' Champion</b></u>: '.mysql_result($data, $val, 'MatchWinner').'</i>';
			}
			else{
				if(mysql_result($data, $val, 'ChampionsAdvantage') == 0){
					$str = $str.'Winner and still '.mysql_result($data, $val, 'MatchTitle').' Champion</b></u>: '.mysql_result($data, $val, 'MatchWinner').'</i>';
				}
				else{
					$str = $str.'Winner</b></u>: '.mysql_result($data, $val, 'MatchWinner').'<br><b>But still '.mysql_result($data, $val, 'MatchTitle').' Champion</b></u>: '.mysql_result($data, $val, 'StartingChamp').'</i>';
				}
			} 
		}
	}

	//$str = $str.'</div></div>';

	return $str;
}

function matchStyle14($data, $val, $soldOutColor){

	$color1 = mysql_result($data, $val, 'matchFirstBorderColor');
	if(mysql_result($data, $val, 'Type') == 'SpecialMatch'){
		$color1 = mysql_result($data, $val, 'graphicColor');
	}
	$color2 = mysql_result($data, $val, 'matchSecondBorderColor');
	
	$workers = mysql_result($data, $val, 'Workers');

	$str = "";
	//$str = $str.'<div align="center" style="width: 100%;">';

	//$str = $str.'<div class=" MatchSegmentBorderOne" align="center" style="border-radius: 20px; border:none; color: white; font-style: normal; text-align: justify; padding: 9px;">';

	if(mysql_result($data, $val, 'MatchTitle') != NULL){
		$str = $str.'<b>'.mysql_result($data, $val, 'MatchTitle').' Championship</b><br>';
	}
	$str = $str.mysql_result($data, $val, 'MatchType').'<br><u>'.mysql_result($data, $val, 'MatchScheme').'</u><br>';
	//$str = $str.'</center><br>';

	$str = $str.mysql_result($data, $val, 'Content').'<br><u><b>';

	$str = $str.'';
	if(mysql_result($data, $val, 'MatchWinner') == NULL){
		$str = $str.'No Contest</b></i></u>';
	}
	else{
		if(mysql_result($data, $val, 'MatchTitle') == NULL){
			$str = $str.'Winner</b></u>: '.mysql_result($data, $val, 'MatchWinner').'</i>';
		}
		else{
			if(mysql_result($data, $val, 'TitleChange') == 1){
				$str = $str.'Winner and new '.mysql_result($data, $val, 'MatchTitle').' Champion</b></u>: '.mysql_result($data, $val, 'MatchWinner').'</i>';
			}
			else{
				if(mysql_result($data, $val, 'ChampionsAdvantage') == 0){
					$str = $str.'Winner and still '.mysql_result($data, $val, 'MatchTitle').' Champion</b></u>: '.mysql_result($data, $val, 'MatchWinner').'</i>';
				}
				else{
					$str = $str.'Winner</b></u>: '.mysql_result($data, $val, 'MatchWinner').'<br><b>But still '.mysql_result($data, $val, 'MatchTitle').' Champion</b></u>: '.mysql_result($data, $val, 'StartingChamp').'</i>';
				}
			} 
		}
	}

	//$str = $str.'</div></div>';

	return $str;
}

function matchStyle15($data, $val, $soldOutColor){

	$soldOutColor = mysql_result($data, $val, 'soldOutColor');
	$color1 = mysql_result($data, $val, 'matchFirstBorderColor');
	if(mysql_result($data, $val, 'Type') == 'SpecialMatch'){
		$color1 = mysql_result($data, $val, 'graphicColor');
	}
	$color2 = mysql_result($data, $val, 'matchSecondBorderColor');
	
	$workers = mysql_result($data, $val, 'Workers');

	$str = "<b><u><font color='".$soldOutColor."'>MATCH</font></u></b> - ";
	//$str = $str.'<div align="center" style="width: 100%;">';

	//$str = $str.'<div class=" MatchSegmentBorderOne" align="center" style="border-radius: 20px; border:none; color: white; font-style: normal; text-align: justify; padding: 9px;">';

	if(mysql_result($data, $val, 'MatchTitle') != NULL){
		$str = $str.'<b>'.mysql_result($data, $val, 'MatchTitle').' Championship</b><br>';
	}
	$str = $str.mysql_result($data, $val, 'MatchType').': <i>'.mysql_result($data, $val, 'MatchScheme').'</i>';
	//$str = $str.'</center><br>';

	$str = $str.'<br><u><b>';

	$str = $str.'';
	if(mysql_result($data, $val, 'MatchWinner') == NULL){
		$str = $str.'No Contest</b></i></u>';
	}
	else{
		if(mysql_result($data, $val, 'MatchTitle') == NULL){
			$str = $str.'Winner</b></u>: '.mysql_result($data, $val, 'MatchWinner').'</i>';
		}
		else{
			if(mysql_result($data, $val, 'TitleChange') == 1){
				$str = $str.'Winner and new '.mysql_result($data, $val, 'MatchTitle').' Champion</b></u>: '.mysql_result($data, $val, 'MatchWinner').'</i>';
			}
			else{
				if(mysql_result($data, $val, 'ChampionsAdvantage') == 0){
					$str = $str.'Winner and still '.mysql_result($data, $val, 'MatchTitle').' Champion</b></u>: '.mysql_result($data, $val, 'MatchWinner').'</i>';
				}
				else{
					$str = $str.'Winner</b></u>: '.mysql_result($data, $val, 'MatchWinner').'<br><b>But still '.mysql_result($data, $val, 'MatchTitle').' Champion</b></u>: '.mysql_result($data, $val, 'StartingChamp').'</i>';
				}
			} 
		}
	}

	//$str = $str.'</div></div>';

	return $str;
}


 */