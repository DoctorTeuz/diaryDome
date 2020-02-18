import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InfoGenerateService {

  constructor() {}

  infoStyle1(segment, format){

    let color = format.infographicFirstBorderColor;
    if(segment.segmentType == 'Hype'){
      color = segment.graphicColor;
    }
  
    let finalString;
    finalString = '<div align="center" style="width: 100%;"><div class="_top" style="font-size: 9px; height: auto; text-align: left; ' + 
                  'border: 0px;background: none; color: white; font-style: normal; text-align: justify;" align="left">' +
                  '<i>' + segment.shownTitle + '</i></div><div class=" InfoSegmentBorderOne" align="center" ' + 
                  'style="border-width: 0px; border-top-style: solid; background: none;border-radius: 20px; border-top-width: 2px; ' + 
                  'border-top-color: ' + color + '; color: white; font-style: normal; text-align: justify; padding: 9px; ' + 
                  'padding-bottom: 10px;">' +
                  segment.content + '</div></div>';
  
    return finalString;
  }

  infoStyle2(segment, format){
    let color = format.infographicFirstBorderColor;
    if(segment.segmentType == 'Hype'){
      color = segment.graphicColor;
    }
  
    let finalString;
  
    finalString = '<div align="center" style="width: 100%;"><div class="_top" style="font-size: 9px; height: auto; text-align: left; ' +
                  'border: 0px; background: none; color: white; font-style: normal; text-align: justify; " align="left">' + 
                  '<i>' + segment.shownTitle + '</i></div><div class=" InfoSegmentBorderOne" align="center" ' + 
                  'style="border-width: 0px; border-top-style: solid; background: none; border-radius: 20px; border-top-width: 2px; ' + 
                  'border-top-color: ' + color + '; color: white; font-style: normal; text-align: center; padding: 9px; ' + 
                  'padding-bottom: 10px;">' +
                  segment.content + '</div></div>';
  
    return finalString;
  }

  infoStyle3(segment, format){
    let color = format.infographicFirstBorderColor;
    if(segment.segmentType == 'Hype'){
      color = segment.graphicColor;
    }
  
    let finalString;
  
    finalString = '<div align="center" style="width: 100%;"><div class="_top" style="font-size: 9px; height: auto;text-align: left;border: 0px; ' +
                  'background: none; color: white; font-style: normal; text-align: justify; " align="left">' + 
                  '<i>' + segment.shownTitle + '</i></div><div class=" InfoSegmentBorderOne" align="center" ' + 
                  'style="border-width: 0px; border-style: solid; background: none; border-radius: 20px; border-width: 2px; ' + 
                  'border-color: ' + color + '; color: white; font-style: normal; text-align: justify; padding: 9px; ' +
                  'padding-bottom: 10px;">' +
                  segment.content + '</div></div>';
  
    return finalString;
  }

  infoStyle4(segment, format){
    let color = format.infographicFirstBorderColor;
    if(segment.segmentType == 'Hype'){
      color = segment.graphicColor;
    }
  
    let finalString;
    
    finalString = '<div align="center" style="width: 100%;"><div class="_top" style="font-size: 9px; height: auto; ' + 
                  'text-align: left; border: 0px; background: none;color: white; font-style: normal; text-align: justify;" ' +
                  'align="left"><i>' + segment.shownTitle + '</i></div><div class=" InfoSegmentBorderOne" align="center" ' + 
                  'style="border-width: 0px; border-style: solid; background: none;border-radius: 20px; border-width: 2px; ' + 
                  'border-color: ' + color + '; color: white; font-style: normal; text-align: center; padding: 9px; ' + 
                  'padding-bottom: 10px;">' +
                  segment.content + '</div></div>';
    return finalString;
  }

  infoStyle5(segment, format){
    let color = format.infographicFirstBorderColor;
    if(segment.segmentType == 'Hype'){
      color = segment.graphicColor;
    }  
    let finalString;
  
    finalString = '<div align="center" style="width: 100%;"><div class="_top" style="font-size: 9px; height: auto; ' + 
                  'text-align: left; border: 0px; background: none;color: white; font-style: normal; text-align: justify;" ' + 
                  'align="left"><i>' + segment.shownTitle + '</i></div><div class="InfoSegmentBorderOne" align="center" ' + 
                  'style="border-width: 0px; border-style: solid; background: none; border-width: 2px; ' + 
                  'border-color: ' + color + '; color: white; font-style: normal; text-align: justify; padding: 9px; ' + 
                  'padding-bottom: 10px;">' +
                  segment.content + '</div></div>';
  
    return finalString;
  }

  infoStyle6(segment, format){
    let color = format.infographicFirstBorderColor;
    if(segment.segmentType == 'Hype'){
      color = segment.graphicColor;
    }  
    let finalString;
  
    finalString = '<div align="center" style="width: 100%;">';
    if(segment.shownTitle){
      finalString = finalString + '<div class="_top" style="font-size: 9px; height: auto;text-align: left; ' + 
                    'border: 0px; background: none;color: white; font-style: normal; text-align: justify; " align="left">' + 
                    '<i>' + segment.shownTitle + '</i></div>';
    }
  
    finalString = finalString + '<div class=" InfoSegmentBorderOne" align="center" style="border-width: 0px; border-style: solid; ' + 
                  'background: none; border-width: 2px; border-color: ' + color + '; color: white; font-style: normal; ' + 
                  'text-align: center; padding: 9px;padding-bottom: 10px;">' +
                  segment.content + '</div></div>';
  
    return finalString;
  }

  infoStyle7(segment, format){
    let color = format.infographicFirstBorderColor;
    if(segment.segmentType == 'Hype'){
      color = segment.graphicColor;
    }  
    let finalString;
  
    finalString = "";
    if(segment.shownTitle){
      finalString = finalString + "<u><b><span class='maiuscolo'>" + segment.shownTitle + "</span></b></u>: ";
    }
    finalString = finalString + segment.content;
  
    return finalString;
  }

}


/**
 * 
 * 

function infoStyle7($data, $val){

	$color = mysql_result($data, $val, 'infographicFirstBorderColor');
	if(mysql_result($data, $val, 'Type') == 'Hype'){
		$color = mysql_result($data, $val, 'graphicColor');
	}
	
	$workers = mysql_result($data, $val, 'Workers');

	$str = "";
	if(mysql_result($data, $val, 'Zona') != ""){
		$str = $str."<u><b>".strtoupper(mysql_result($data, $val, 'Zona'))."</b></u>: ";
	}
	$str = $str.mysql_result($data, $val, 'Content');

	return $str;
}
 */