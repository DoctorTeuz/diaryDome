import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../objects/user';
import { Titles } from '../enums/titles.enum';

@Injectable({
  providedIn: 'root'
})
export class GeneralFunctionService {

  imagePath = environment.path;
  lastShowDate;
  completeMenu: Array<any> = [];
  controlKey = [];
  actualMenu;
  user = new User();
  actualPlace = [];
  lastUrl;

  constructor(
    private userClass: User,
    private http : HttpClient,
    public router: Router,
      ) { 
        this.actualPlace = window.location.pathname.replace('/DiaryDome', "").replace('/DiaryDome2', "").split('/');
        if(!this.user.ID){
            if(localStorage.getItem('user')){
              this.setUser(JSON.parse(localStorage.getItem('user')));
            }
            else{
                if(this.actualPlace[this.actualPlace.length - 1] != 'workerCompleteList' && 
                this.actualPlace[this.actualPlace.length - 1] != 'albo'){
                    this.router.navigateByUrl('/login');
                }
            }
        }
        this.getTeuzLastShowDateAction()
        this.getMenu().subscribe((res: any) => {
            this.completeMenu = res.body.menu;
            this.filterMenu();
        })
  }

    createPath(userId, img, format, type?){
        const userPath = userId + '/';
        const typePath = type ? type + '/' : "";
        const formatPath = '.' + format
        return this.imagePath + userPath + typePath + img + formatPath;
    }

    getTeuzLastShowDate(){
        return this.http.get(environment.apiPath + '/miscellaneous.php/getTeuzLastShowDate')
    }

    getTeuzLastShowDateAction(){
        if(!this.lastShowDate){
            this.countThread(true);
            this.getTeuzLastShowDate().subscribe(
                (res: any) => {
                    this.countThread(false);
                    if(res){
                        this.lastShowDate = res.body.lastShowDate;
                        this.lastShowDate['completeDate'] = 
                            (this.lastShowDate.day < 10 ? '0'+this.lastShowDate.day : this.lastShowDate.day) + '/' + 
                            (this.lastShowDate.month < 10 ? '0'+this.lastShowDate.month : this.lastShowDate.month) + '/' +
                            this.lastShowDate.year;
                        console.log(this.lastShowDate)
                    }
            })
        }
    }

    titleStringGenerator(title, lastShowDate?){
        lastShowDate = lastShowDate ? lastShowDate : this.lastShowDate;
        let str = "";
        let globalLenght = 0;
        globalLenght = parseInt(title.CombinateDays) + (title.Current ? (this.calculateReingLenght(title.Date, lastShowDate) + 1) : 0);
        str = title.Reigns + 'x ' + title.Title + ' ' + (title.CombinateDays == null ? '' : ('(' + globalLenght + (title.Current ? '+' : '') + ' days)'));
        return str;
    }

    calculateReingLenght(date, lastShowDate?){
        lastShowDate = lastShowDate ? lastShowDate : this.lastShowDate;
        let dArray = date.split(" ");
        var weekDays = 7;
        var monthDays = weekDays*4;
        var yearDays = monthDays*12;
        var totDays = 0;
    
        totDays = totDays + (lastShowDate.year - dArray[1]) * yearDays;
        totDays = totDays + (lastShowDate.month - this.parseMonth(dArray[0])) * monthDays;
        totDays = totDays + (lastShowDate.week - this.parseWeek(dArray[3])) * weekDays;
        totDays = totDays + (lastShowDate.dayWeek - this.parseDay(dArray[2]));

        return totDays;
    }

    ageCalculation(worker, lastShowDate?){
        lastShowDate = lastShowDate ? lastShowDate : this.lastShowDate;
        if(!worker.Birthday){
        return worker.Age
        }
        else{
        let birthData = worker.Birthday.split('/');
        let age = lastShowDate.year - birthData[2];
        if(lastShowDate.month < birthData[1] ||
            (lastShowDate.month == birthData[1]  && lastShowDate.day < birthData[0])){
            age--;
        }
        return age; 
        }
    }

    parseDay($DayWeek){
    switch ($DayWeek) {
        case 'Lun':
            return 1;
            break;
        case 'Mar':
            return 2;
            break;
        case 'Mer':
            return 3;
            break;
        case 'Gio':
            return 4;
            break;
        case 'Ven':
            return 5;
            break;
        case 'Sab':
            return 6;
            break;
        case 'Dom':
            return 7;
            break;
    }
    }

    parseWeek($week){
        switch ($week) {
            case 'W1':
                return 1;
                break;
            case 'W2':
                return 2;
                break;
            case 'W3':
                return 3;
                break;
            case 'W4':
                return 4;
                break;
        }
    }

    parseMonth($month){
        switch ($month) {
            case 'Gen':
                return 1;
                break;
            case 'Feb':
                return 2;
                break;
            case 'Mar':
                return 3;
                break;
            case 'Apr':
                return 4;
                break;
            case 'Mag':
                return 5;
                break;
            case 'Giu':
                return 6;
                break;
            case 'Lug':
                return 7;
                break;
            case 'Ago':
                return 8;
                break;
            case 'Set':
                return 9;
                break;
            case 'Ott':
                return 10;
                break;
            case 'Nov':
                return 11;
                break;
            case 'Dic':
                return 12;
                break;
        }
    }
    
    getMenu(){
        return this.http.get(environment.apiPath + '/miscellaneous.php/getMenu')
    }


    thread = 0;
    countThread(t){
        if(t){
            this.thread++;
        }
        else{
            this.thread--;
        }
    }

    navigateTo(url){
        this.router.navigateByUrl(url);
    }

    setUser(user){
        this.user.setUser(user);
        localStorage.setItem('user', JSON.stringify(this.user));
    }

    filterMenu(from?){
        console.log(this.actualPlace[this.actualPlace.length - 1]);
        if(this.actualPlace[this.actualPlace.length - 1] == 'login' && from != 'login'){
            this.actualMenu = [];
            return;
        }
        this.controlKey = [];
        if(this.actualPlace[this.actualPlace.length - 1] == 'workerCompleteList' || 
            this.actualPlace[this.actualPlace.length - 1] == 'albo'){
              this.controlKey.push('WWETeuz');
        }
        else if(this.actualPlace[this.actualPlace.length - 1] != 'login' || from == 'login'){
          this.controlKey.push('notWWETeuz');
          this.controlKey.push('diaryDome');
          if(this.user.userType == 'admin'
           || this.user.userType == 'superAdmin'){
            this.controlKey.push('administration');
          }
        }
        this.actualMenu = this.completeMenu.filter(voce => {
            return this.controlKey.filter(key => key == voce.Auth).length > 0
          });
        console.log(this.actualMenu)
    }

    findTitle(titleName, showId){
        let titleCode = "";
        let userId = this.user.ID;
        if(showId == 0 || userId == 1){
          titleCode = Titles[titleName];
          return "<img src='" +  this.createPath(1, titleCode, 'jpg', 'Belts') + "'  width='180px' style='border-radius: 10px;'><br>";
        }
        else{
            let titleCode = titleName.split(" ").join("_");
            let titleUrl = this.user.titleList.filter(tit => tit.indexOf(titleCode) > -1).sort((a, b) => {
                if(a < b){
                    return 1;
                }
                if (b < a){
                    return -1
                }
            })[0];
            return "<img src='" +  this.createPath(this.user.ID, titleUrl.split('.')[0], titleUrl.split('.')[1], 'Belts') + "'  width='180px' style='border-radius: 10px;'><br>";
        }
      
    }

    createWorkerImageStyle(worker, style, show, showColor){
        let userId = this.user.ID;
        let shape = "";
        let width = "";
        let border = "";
        let widthVVSS = "";
        let styleFinal = "";
        if(style.indexOf('Round') > -1){
            shape = 'border-radius: 50px;';
        }
        if(style.indexOf('Little') > -1){
            width = 'width:75px;';
            widthVVSS = 'style= "height: 70px;"';
        }
        if(style.indexOf('Border') > -1){
            border = 'border-color: ' + showColor + '; border-width: 1px;';
        }
        if(style.indexOf('Blunt') > -1){
            shape = 'border-radius: 20px;';
        }
    
        if(shape != "" || width != "" || border != ""){
            styleFinal = 'style="' + shape + width + border + '"';
        }
        let targetDir = "";
        if(worker == "VVSS"){
            if(show == 0){
                return '<img src="' + this.createPath(1, 'VS', 'jpg', 'Loghi') + '" ' + widthVVSS + '>';
            }
            else{
                if(this.user.VSurl){
                    return '<img src="' + this.createPath(this.user.ID, this.user.VSurl.split('.')[0], this.user.VSurl.split('.')[1], 'Loghi') + '" ' + widthVVSS + '>';
                }
                else{
                    return "VS"
                }
            }
        }
        let workerData = worker.split('#');
        let workerName = workerData[0].split(" ").join("_");
        workerName = workerName.split("'").join("");
        workerName = workerName.split(".").join("");
    
        if(show == 0){
            return '<img src="' + this.createPath(1, workerName, 'jpg') + '" ' + styleFinal + '>';
        }
        else{
            const workerFinalName = this.user.workerImageList.filter(wrk => wrk.split('.')[0] === workerName)[0];
            return '<img src="' + this.createPath(this.user.ID, workerFinalName.split('.')[0], workerFinalName.split('.')[1]) + '" ' + styleFinal + '>';
        }        
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

    clearText(text){        
        let dataParsed = text;
        dataParsed = dataParsed.split("\r\n").join('');
        dataParsed = dataParsed.split("&egrave;").join('è');
        dataParsed = dataParsed.split("&agrave;").join('à');
        dataParsed = dataParsed.split("&igrave;").join('ì');
        dataParsed = dataParsed.split("&ugrave;").join('ù');
        dataParsed = dataParsed.split("&ograve;").join('ò');
        dataParsed = dataParsed.split("&eacute;").join('é');
        dataParsed = dataParsed.split("&#176;").join('°');
        dataParsed = dataParsed.split("&copy;").join('©');
        dataParsed = dataParsed.split("&Agrave;").join('À');
        dataParsed = dataParsed.split("&Egrave;").join('È');
        dataParsed = dataParsed.split("&Eacute;").join('É');
        dataParsed = dataParsed.split("&Igrave;").join('Ì');
        dataParsed = dataParsed.split("&Ograve;").join('Ò');
        dataParsed = dataParsed.split("&Ugrave;").join('Ù');
        dataParsed = dataParsed.split("''").join("'");
        dataParsed = dataParsed.split("<br>").join("\n");
        dataParsed = dataParsed.split("<br/>").join("\n");
        dataParsed = dataParsed.split("<br />").join("\n");
/*         dataParsed = dataParsed.split("<b>").join("<strong>");
        dataParsed = dataParsed.split("</b>").join("</strong>");
        dataParsed = dataParsed.split("<i>").join("<em>");
        dataParsed = dataParsed.split("</i>").join("</em>");
        dataParsed = dataParsed.split("<u>").join("<span style='text-decoration: underline;'>");
        dataParsed = dataParsed.split("</u>").join("</span>"); */

        

        return dataParsed;
    }

    richText(text){
        let dataParsed = text;
        dataParsed = dataParsed.split('è').join("&egrave;");
        dataParsed = dataParsed.split('à').join("&agrave;");
        dataParsed = dataParsed.split('ì').join("&igrave;");
        dataParsed = dataParsed.split('ù').join("&ugrave;");
        dataParsed = dataParsed.split('ò').join("&ograve;");
        dataParsed = dataParsed.split('é').join("&eacute;");
        dataParsed = dataParsed.split('°').join("&#176;");
        dataParsed = dataParsed.split('©').join("&copy;");
        dataParsed = dataParsed.split('À').join("&Agrave;");
        dataParsed = dataParsed.split('È').join("&Egrave;");
        dataParsed = dataParsed.split('É').join("&Eacute;");
        dataParsed = dataParsed.split('Ì').join("&Igrave;");
        dataParsed = dataParsed.split('Ò').join("&Ograve;");
        dataParsed = dataParsed.split('Ù').join("&Ugrave;");
        dataParsed = dataParsed.split("'").join("''");
        dataParsed = dataParsed.split("\n").join("<br>");

        return dataParsed;
    }
}
