import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'diaryDome-loading-wheel',
  templateUrl: './loading-wheel.component.html',
  styleUrls: ['./loading-wheel.component.scss']
})
export class LoadingWheelComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  loadingWheel(){
    return environment.loadingWheel
  }

  

}
