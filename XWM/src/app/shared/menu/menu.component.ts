import { Component, OnInit, Injectable, Output, EventEmitter, NgZone, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralFunctionService } from 'src/app/services/general-function.service';
import { LoginService } from 'src/app/services/login.service';
import { MatDialog } from '@angular/material';
import { CreateShowPopupComponent } from 'src/app/diaryDome/create-show-popup/create-show-popup.component'
import { CreateFormatPopupComponent } from 'src/app/diaryDome/create-format-popup/create-format-popup.component';

@Component({
  selector: 'diaryDome-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  
})

@Injectable({
  providedIn: 'root'
})
export class MenuComponent implements OnInit {

  open = false;
  secondLevel;
  

  @Output() opening = new EventEmitter();

  constructor(
    private router: Router,
    public GFService: GeneralFunctionService,
    public loginService: LoginService,
    public zone: NgZone,
    public dialog: MatDialog,
  ) {

  }

  
  ngOnInit() {
    this.GFService.countThread(true);
    this.GFService.actualPlace = window.location.pathname.replace('/DiaryDome', "").replace('/DiaryDome2', "").split('/');
    this.GFService.getMenu().subscribe(
      (res: any) => {
        this.GFService.countThread(false);
        this.GFService.completeMenu = res.body.menu;
      }
    )
  }

  enlargeMenu(){
    this.open = !this.open;
    this.opening.emit(this.open ? 'T' : 'F');
  }

  action(voice){
    switch (voice.actionKey) {
      case 'goTo':
        this.GFService.navigateTo(voice.usePath);
        this.updateActualPath(voice.usePath);
        break;
      case 'secondLevel':
        if(this.secondLevel == voice.Padre){
          this.secondLevel = null;
        }
        else{
          this.secondLevel = voice.Padre;
        }
      break;
      case 'popup':
        this.openPopup(voice.usePath);
      default:
        break;
    }
  }

  updateActualPath(newPath){
    this.GFService.actualPlace = newPath.replace('/DiaryDome', "").replace('/DiaryDome2', "").split('/');
  }

  checkInPage(voice){
    return voice.usePath.replace('/', '') === this.GFService.actualPlace[1];
  }

  openPopup(path){
    let component;
    let width = '800px';
    switch (path) {
      case 'CreateShowPopupComponent':
        component = CreateShowPopupComponent;
        break;
      case 'CreateFormatPopupComponent':
        component = CreateFormatPopupComponent;
        width= '1200px';
      default:
        break;
    }
    const config = {
        redirect: true,
      };
    let dialogRef  = this.dialog.open(component, {
      width: width,
      data: config
    })
  }
}
