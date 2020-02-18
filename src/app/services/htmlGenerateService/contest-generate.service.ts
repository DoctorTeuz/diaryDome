import { Injectable } from '@angular/core';
import { GeneralFunctionService } from '../general-function.service';
import { isNumber } from 'util';

@Injectable({
  providedIn: 'root'
})
export class ContestGenerateService {

  constructor(
    public GFService: GeneralFunctionService,
  ) { }

  showStyleOpening1(){
    let finalString;
    finalString = '<div style="width:700px; text-style: normal; margin: auto;">';
    return finalString;
  }

  showStyleHeader1(show, format){
    let finalString;

    finalString = '<p align="center">';
	if(show.imageUrl){
    const url = this.GFService.createPath(this.GFService.user.ID, show.imageUrl.split('.')[0], show.imageUrl.split('.')[1], 'Loghi')
		finalString = finalString + '<img src="' + url + '"><br>';
	}
	if(show.showName != format.label){
		finalString = finalString + "<b>" + show.showName + "</b><br>";
	}
	if(this.GFService.user.dateFormat == 'TEW'){
		finalString = finalString + show.dayWeek + ', ' + show.week + ' Settimana, ' + show.month + ' ' + show.year + '<br>';
	}
	else{
		finalString = finalString + show.year + '<br>';
	}
	if(show.arena){
		finalString = finalString + '<b>' + show.arena + '</b>';
	}
	if(show.city){
    if(show.arena){
      finalString = finalString + ', ';
    }
		finalString = finalString + show.city;
  }
  
  if(show.arena || show.city){
    finalString = finalString + '<br>';
  }

	if(isNumber(show.pubblico)){
		finalString = finalString + '<b>' + show.pubblico + ' Spettatori';
		if(show.soldOut == 1){
			finalString = finalString + ' - <span style="color: ' + show.baseColor + '" class="soldOutColorValue">SOLD OUT</span>';
		}
		finalString = finalString + '</b>';
	}

    finalString = finalString + '</p>';
    return finalString;
  }

  showStyleEnding(){
    return "</p></div>";
  }

  
  showStyleOpening2(){
    let finalString = "";
    finalString = finalString + '<div style="width:700px; text-style: normal; margin: auto; text-align: center;">';
    return finalString;
  }

  showStyleHeader2(show, format){
    let finalString = '<p align="center">';
    if(show.imageUrl){
      const url = this.GFService.createPath(this.GFService.user.ID, show.imageUrl.split('.')[0], show.imageUrl.split('.')[1], 'Loghi')
      finalString = finalString + '<img src="' + url + '"><br>';
    }
    if(show.showName != format.label){
      finalString = finalString + "<b>" + show.showName + "</b><br>";
    }
    if(this.GFService.user.dateFormat == 'TEW'){
      finalString = finalString + show.dayWeek + ', ' + show.week + ' Settimana, ' + show.month + ' ' + show.year + '<br>';
    }
    else{
      finalString = finalString +  show.year + '<br>';
    }
    if(show.arena){
      finalString = finalString + '<b>' + show.arena + '</b>';
    }
    if(show.city){
      if(show.arena){
        finalString = finalString + ', ';
      }
      finalString = finalString + show.city;
    }
    
    if(show.arena || show.city){
      finalString = finalString + '<br>';
    }
  
    if(isNumber(show.pubblico)){
      finalString = finalString + '<b>' + show.pubblico + ' Spettatori';
      if(show.soldOut == 1){
        finalString = finalString + ' - <span style="color: ' + show.baseColor + '" class="soldOutColorValue">SOLD OUT</span>';
      }
      finalString = finalString + '</b>';
    }
  
    finalString = finalString + '</p>';
    return finalString;
  }


  showStyleOpening3(){
    let finalString = "";
    finalString = finalString + '<div style="text-style: normal; margin: auto;">';
    return finalString;
  }

  showStyleHeader3(show, format){
    let finalString = '<p align="center">';
    if(show.imageUrl){
      const url = this.GFService.createPath(this.GFService.user.ID, show.imageUrl.split('.')[0], show.imageUrl.split('.')[1], 'Loghi')
      finalString = finalString + '<img src="' + url + '"><br>';
    }
    if(show.showName != format.label){
      finalString = finalString + "<b>" + show.showName + "</b><br>";
    }
    if(this.GFService.user.dateFormat == 'TEW'){
      finalString = finalString + show.dayWeek + ', ' + show.week + ' Settimana, ' + show.month + ' ' + show.year + '<br>';
    }
    else{
      finalString = finalString +  show.year + '<br>';
    }
    if(show.arena){
      finalString = finalString + '<b>' + show.arena + '</b>';
    }
    if(show.city){
      if(show.arena){
        finalString = finalString + ', ';
      }
      finalString = finalString + show.city;
    }
    
    if(show.arena || show.city){
      finalString = finalString + '<br>';
    }
  
    if(isNumber(show.pubblico)){
      finalString = finalString + '<b>' + show.pubblico + ' Spettatori';
      if(show.soldOut == 1){
        finalString = finalString + ' - <span style="color: ' + show.baseColor + '" class="soldOutColorValue">SOLD OUT</span>';
      }
      finalString = finalString + '</b>';
    }
  
    finalString = finalString + '</p>';
    return finalString;
  }


  showStyleOpening4(){
    let finalString = "";
    finalString = finalString + '<div style="text-style: normal; margin: auto; text-align: center;">';
    return finalString;
  }

  showStyleHeader4(show, format){
    let finalString = '<p align="center">';
    if(show.imageUrl){
      const url = this.GFService.createPath(this.GFService.user.ID, show.imageUrl.split('.')[0], show.imageUrl.split('.')[1], 'Loghi')
      finalString = finalString + '<img src="' + url + '"><br>';
    }
    if(show.showName != format.label){
      finalString = finalString + "<b>" + show.showName + "</b><br>";
    }
    if(this.GFService.user.dateFormat == 'TEW'){
      finalString = finalString + show.dayWeek + ', ' + show.week + ' Settimana, ' + show.month + ' ' + show.year + '<br>';
    }
    else{
      finalString = finalString +  show.year + '<br>';
    }
    if(show.arena){
      finalString = finalString + '<b>' + show.arena + '</b>';
    }
    if(show.city){
      if(show.arena){
        finalString = finalString + ', ';
      }
      finalString = finalString + show.city;
    }
    
    if(show.arena || show.city){
      finalString = finalString + '<br>';
    }
  
    if(isNumber(show.pubblico)){
      finalString = finalString + '<b>' + show.pubblico + ' Spettatori';
      if(show.soldOut == 1){
        finalString = finalString + ' - <span style="color: ' + show.baseColor + '" class="soldOutColorValue">SOLD OUT</span>';
      }
      finalString = finalString + '</b>';
    }
  
    finalString = finalString + '</p>';
    return finalString;
  }

  analyzeBGColor(color){
    if(color.startsWith('#')){
      let finalColor = color.replace('#', '');
      let r;
      let g;
      let b;
      if (finalColor.length === 2) {
        r = parseInt(finalColor[0].toString() + finalColor[1].toString(), 16);
        g = r;
        b = r;
      } else if (finalColor.length === 3) {
          r = parseInt(finalColor[0].toString() + finalColor[0].toString(), 16);
          g = parseInt(finalColor[1].toString() + finalColor[1].toString(), 16);
          b = parseInt(finalColor[2].toString() + finalColor[2].toString(), 16);
      } else if (finalColor.length === 6) {
          r = parseInt(finalColor[0].toString() + finalColor[1].toString(), 16);
          g = parseInt(finalColor[2].toString() + finalColor[3].toString(), 16);
          b = parseInt(finalColor[4].toString() + finalColor[5].toString(), 16);
      } else {
          return '#FFFFFF';
      }
      if((((r * 0.299) + (g * 0.587) + (b * 0.114))) > 186){
        return '#000000';
      }
      else{
        return '#FFFFFF';
      }
    }
  }
}
