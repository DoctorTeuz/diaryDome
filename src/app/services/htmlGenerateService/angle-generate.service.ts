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

  angleStyle3(segment, format){
	let color = format.angleFirstBorderColor;
	let finalString;

	finalString = 	'<div align="center" style="width: 100%;"><div class="_top" style="font-size: 9px; height: auto; text-align: left; ' +
					'border: 0px;background: none;color: white; font-style: normal; text-align: justify;" align="left">' +
					'<i>'+ segment.shownTitle +'</i></div><div class=" AngleSegmentBorderOne" align="center" ' +
					 'style="border-width: 0px; border-style: solid; background: none;border-radius: 20px; border-width: 2px; ' +
					 'border-color: ' + color + '; color: white; font-style: normal; text-align: justify; padding: 9px; ' +
					 'padding-bottom: 10px;">'+
					 segment.content + '</div></div>';

	return finalString;
  }

  angleStyle4(segment, format){
	let color = format.angleFirstBorderColor;
	let finalString;

	finalString = 	'<div align="center" style="width: 100%;"><div class="_top" style="font-size: 9px; height: auto;text-align: left; ' +
					'border: 0px; background: none; color: white; font-style: normal; text-align: justify;" align="left">' +
					'<i>'+ segment.shownTitle +'</i></div><div class=" AngleSegmentBorderOne" align="center" ' +
					'style="border-width: 0px; border-style: solid; background: none;border-radius: 20px; border-width: 2px; ' + 
					'border-color: ' + color +'; color: white; font-style: normal; text-align: center; padding: 9px; ' + 
					'padding-bottom: 10px;">'+
					segment.content + '</div></div>';

	return finalString;
  }

  angleStyle5(segment, format){
	let color = format.angleFirstBorderColor;
	let finalString;

	finalString = 	'<div align="center" style="width: 100%;"><div class="_top" style="font-size: 9px; height: auto;text-align: left; border: 0px; ' +
					'background: none; color: white; font-style: normal; text-align: justify; " align="left">' + 
					'<i>'+ segment.shownTitle +'</i></div><div class=" AngleSegmentBorderOne" align="center" ' +
					'style="border-width: 0px; border-style: solid; background: none; border-width: 2px; ' + 
					'border-color: ' + color +'; color: white; font-style: normal; text-align: justify; padding: 9px; ' +
					'padding-bottom: 10px;">'+
					segment.content + '</div></div>';

	return finalString;
  }

  angleStyle6(segment, format){
	let color = format.angleFirstBorderColor;
	let finalString;

	finalString = '<div align="center" style="width: 100%;">';
	if(segment.shownTitle){
		finalString = finalString + 
					'<div class="_top" style="font-size: 9px; height: auto;text-align: left;border: 0px;background: none; ' +
					'color: white; font-style: normal; text-align: justify; " align="left">' +
					'<i>'+ segment.shownTitle +'</i></div>';
	}

	finalString = finalString + '<div class=" AngleSegmentBorderOne" align="center" style="border-width: 0px; border-style: solid; ' +
				'background: none; border-width: 2px; border-color: ' + color +'; color: white; font-style: normal; ' + 
				'text-align: center; padding: 9px;padding-bottom: 10px;">'+
				segment.content + '</div></div>';

	return finalString;
  }

  angleStyle7(segment, format){
	/* let color = format.angleFirstBorderColor; */
	let finalString;

	finalString = '';
	if(segment.shownTitle){
		finalString = finalString + "<u><b><span class='maiuscolo'>"+ segment.shownTitle +"</span></b></u>: ";
	}

	finalString = finalString + segment.content;

	return finalString;
  }
}
