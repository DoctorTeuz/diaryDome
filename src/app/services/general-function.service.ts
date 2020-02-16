import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../objects/user';

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
        this.actualPlace = window.location.pathname.split('/');
        if(!this.user.ID){
            if(localStorage.getItem('user')){
              this.setUser(JSON.parse(localStorage.getItem('user')));
            }
            else{
                if(this.actualPlace[1] != 'workerCompleteList' && 
                this.actualPlace[1] != 'albo'){
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
        this.controlKey = [];
        if(this.actualPlace[1] == 'workerCompleteList' || 
            this.actualPlace[1] == 'albo'){
              this.controlKey.push('WWETeuz');
        }
        else if(this.actualPlace[1] != 'login' || from == 'login'){
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
}
