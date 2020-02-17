import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AngleGenerateService {

  constructor() { }

  angleStyle1(segment, format){

    let color = format.angleFirstBorderColor;
    let finalString;
    finalString = '<div align="center" style="width: 100%;">' +
                  '<div class="_top" style="font-size: 9px; height: auto;text-align: left;' +
                  'border: 0px;background: none;color: white; font-style: normal; text-align: justify;"' +
                  ' align="left"><i>' + segment.shownTitle + 
                  '</i></div><div class="AngleSegmentBorderOne" align="center" ' + 
                  'style="border-width: 0px; border-top-style: solid; background: none; border-radius: 20px;' +
                  ' border-top-width: 2px; ' +
                  'border-top-color: ' + color + '; color: white; font-style: normal; text-align: justify; ' +
                  'padding: 9px;padding-bottom: 10px;">' +
                  segment.content  +'</div></div>';
    console.log(finalString);
    return finalString;
  }

  angleStyle2(segment, format){

    let color = format.angleFirstBorderColor;
   
    let finalString;
    finalString = '<div align="center" style="width: 100%"><div class="_top" style="font-size: 9px;' +
                  ' height: auto;text-align: left;border: 0px;background: none;color: white; ' +
                  'font-style: normal; text-align: justify; " align="left"><i>' + segment.shownTitle + 
                  '</i></div><div class=" AngleSegmentBorderOne" align="center" style="border-width: 0px; ' +
                  'border-top-style: solid; background: none;border-radius: 20px; border-top-width: 2px; ' + 
                  'border-top-color: ' + color + '; color: white; font-style: normal; text-align: center; ' +
                  'padding: 9px;padding-bottom: 10px;">' +
                  segment.content + '</div></div>';
    return finalString;
  }
}

/**
 * 
function angleStyle2($data, $val){

	$color = mysql_result($data, $val, 'angleFirstBorderColor');
	
	$workers = mysql_result($data, $val, 'Workers');


	$str = '<div align="center"><div class="_top" style="font-size: 9px; height: auto;text-align: left;border: 0px;background: none;color: white; font-style: normal; text-align: justify; " align="left"><i>'.mysql_result($data, $val, 'Zona').'</i></div><div class=" AngleSegmentBorderOne" align="center" style="border-width: 0px; border-top-style: solid; background: none;border-radius: 20px; border-top-width: 2px; border-top-color: '.$color.'; color: white; font-style: normal; text-align: center; padding: 9px;padding-bottom: 10px;">'.mysql_result($data, $val, 'Content').'</div></div>';

	return $str;
}

function angleStyle3($data, $val){

	$color = mysql_result($data, $val, 'angleFirstBorderColor');
	
	$workers = mysql_result($data, $val, 'Workers');


	$str = '<div align="center"><div class="_top" style="font-size: 9px; height: auto;text-align: left;border: 0px;background: none;color: white; font-style: normal; text-align: justify; " align="left"><i>'.mysql_result($data, $val, 'Zona').'</i></div><div class=" AngleSegmentBorderOne" align="center" style="border-width: 0px; border-style: solid; background: none;border-radius: 20px; border-width: 2px; border-color: '.$color.'; color: white; font-style: normal; text-align: justify; padding: 9px;padding-bottom: 10px;">'.mysql_result($data, $val, 'Content').'</div></div>';

	return $str;
}

function angleStyle4($data, $val){

	$color = mysql_result($data, $val, 'angleFirstBorderColor');
	
	$workers = mysql_result($data, $val, 'Workers');


	$str = '<div align="center"><div class="_top" style="font-size: 9px; height: auto;text-align: left;border: 0px;background: none;color: white; font-style: normal; text-align: justify; " align="left"><i>'.mysql_result($data, $val, 'Zona').'</i></div><div class=" AngleSegmentBorderOne" align="center" style="border-width: 0px; border-style: solid; background: none;border-radius: 20px; border-width: 2px; border-color: '.$color.'; color: white; font-style: normal; text-align: center; padding: 9px;padding-bottom: 10px;">'.mysql_result($data, $val, 'Content').'</div></div>';

	return $str;
}

function angleStyle5($data, $val){

	$color = mysql_result($data, $val, 'angleFirstBorderColor');
	
	$workers = mysql_result($data, $val, 'Workers');


	$str = '<div align="center"><div class="_top" style="font-size: 9px; height: auto;text-align: left;border: 0px;background: none;color: white; font-style: normal; text-align: justify; " align="left"><i>'.mysql_result($data, $val, 'Zona').'</i></div><div class=" AngleSegmentBorderOne" align="center" style="border-width: 0px; border-style: solid; background: none; border-width: 2px; border-color: '.$color.'; color: white; font-style: normal; text-align: justify; padding: 9px;padding-bottom: 10px;">'.mysql_result($data, $val, 'Content').'</div></div>';

	return $str;
}

function angleStyle6($data, $val){

	$color = mysql_result($data, $val, 'angleFirstBorderColor');
	
	$workers = mysql_result($data, $val, 'Workers');

	$str = '<div align="center">';
	if(mysql_result($data, $val, 'Zona') != NULL){
		$str = $str.'<div class="_top" style="font-size: 9px; height: auto;text-align: left;border: 0px;background: none;color: white; font-style: normal; text-align: justify; " align="left"><i>'.mysql_result($data, $val, 'Zona').'</i></div>';
	}

	$str = $str.'<div class=" AngleSegmentBorderOne" align="center" style="border-width: 0px; border-style: solid; background: none; border-width: 2px; border-color: '.$color.'; color: white; font-style: normal; text-align: center; padding: 9px;padding-bottom: 10px;">'.mysql_result($data, $val, 'Content').'</div></div>';

	return $str;
}

function angleStyle7($data, $val){

	$color = mysql_result($data, $val, 'angleFirstBorderColor');
	
	$workers = mysql_result($data, $val, 'Workers');

	$str = "";
	if(mysql_result($data, $val, 'Zona') != ""){
		$str = $str."<u><b>".strtoupper(mysql_result($data, $val, 'Zona'))."</b></u>: ";
	}
	$str = $str.mysql_result($data, $val, 'Content');

	return $str;
}
 */