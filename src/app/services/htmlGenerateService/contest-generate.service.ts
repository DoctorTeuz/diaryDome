import { Injectable } from '@angular/core';
import { GeneralFunctionService } from '../general-function.service';
import { Titles } from 'src/app/enums/titles.enum';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContestGenerateService {

  constructor(
    public GFService: GeneralFunctionService,
  ) { }

  showStyleOpening1(){
    let finalString = "";
    finalString = '<div style="width:700px; text-style: normal; margin: auto;">';
    return finalString;
  }

  showStyleHeader1(show, format){
    let finalString = "";

    finalString = '<div style="width: 100%"><p align="center">';
	if(show.imageUrl){
    const url = this.GFService.createPath(this.GFService.user.ID, show.imageUrl.split('.')[0], show.imageUrl.split('.')[1], 'Loghi')
		finalString = finalString + '<img src="' + url + '"><br>';
	}
	if(show.showName != format.Label){
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

	if(show.pubblico && show.pubblico != 'NULL' && !isNaN(show.pubblico)){
		finalString = finalString + '<b>' + show.pubblico + ' Spettatori';
		if(show.soldOut == 1){
			finalString = finalString + ' - <span style="color: ' + show.baseColor + '" class="soldOutColorValue">SOLD OUT</span>';
		}
		finalString = finalString + '</b>';
	}

    finalString = finalString + '</p></div>';
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
    let finalString = '<div style="width: 100%"><p align="center">';
    if(show.imageUrl){
      const url = this.GFService.createPath(this.GFService.user.ID, show.imageUrl.split('.')[0], show.imageUrl.split('.')[1], 'Loghi')
      finalString = finalString + '<img src="' + url + '"><br>';
    }
    if(show.showName != format.Label){
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
  
    if(show.pubblico && show.pubblico != 'NULL' && !isNaN(show.pubblico)){
      finalString = finalString + '<b>' + show.pubblico + ' Spettatori';
      if(show.soldOut == 1){
        finalString = finalString + ' - <span style="color: ' + show.baseColor + '" class="soldOutColorValue">SOLD OUT</span>';
      }
      finalString = finalString + '</b>';
    }
  
    finalString = finalString + '</p></div>';
    return finalString;
  }


  showStyleOpening3(){
    let finalString = "";
    finalString = finalString + '<div style="text-style: normal; margin: auto;">';
    return finalString;
  }

  showStyleHeader3(show, format){
    let finalString = '<div style="width: 100%"><p align="center">';
    if(show.imageUrl){
      const url = this.GFService.createPath(this.GFService.user.ID, show.imageUrl.split('.')[0], show.imageUrl.split('.')[1], 'Loghi')
      finalString = finalString + '<img src="' + url + '"><br>';
    }
    if(show.showName != format.Label){
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
  
    if(show.pubblico && show.pubblico != 'NULL' && !isNaN(show.pubblico)){
      finalString = finalString + '<b>' + show.pubblico + ' Spettatori';
      if(show.soldOut == 1){
        finalString = finalString + ' - <span style="color: ' + show.baseColor + '" class="soldOutColorValue">SOLD OUT</span>';
      }
      finalString = finalString + '</b>';
    }
  
    finalString = finalString + '</p></div>';
    return finalString;
  }


  showStyleOpening4(){
    let finalString = "";
    finalString = finalString + '<div style="text-style: normal; margin: auto; text-align: center;">';
    return finalString;
  }

  showStyleHeader4(show, format){
    let finalString = '<div style="width: 100%"><p align="center">';
    if(show.imageUrl){
      const url = this.GFService.createPath(this.GFService.user.ID, show.imageUrl.split('.')[0], show.imageUrl.split('.')[1], 'Loghi')
      finalString = finalString + '<img src="' + url + '"><br>';
    }
    if(show.showName != format.Label){
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
  
    if(show.pubblico && show.pubblico != 'NULL' && !isNaN(show.pubblico)){
      finalString = finalString + '<b>' + show.pubblico + ' Spettatori';
      if(show.soldOut == 1){
        finalString = finalString + ' - <span style="color: ' + show.baseColor + '" class="soldOutColorValue">SOLD OUT</span>';
      }
      finalString = finalString + '</b>';
    }
  
    finalString = finalString + '</p></div>';
    return finalString;
  }


}
