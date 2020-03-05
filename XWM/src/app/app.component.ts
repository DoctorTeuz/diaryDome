import { Component } from '@angular/core';
import { GeneralFunctionService } from './services/general-function.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Diary Dome';
  spinnerStatus = false;
  openMenu = false;
  
  constructor(
    public GFService: GeneralFunctionService,
  ){

  }

  updateOpen(event){
    this.openMenu = event == 'T' ? true : false;
  }
}
