import { Component, OnInit } from '@angular/core';
import { GeneralFunctionService } from 'src/app/services/general-function.service';

@Component({
  selector: 'diaryDome-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  constructor(
    public GFService: GeneralFunctionService,
    ) { }

  ngOnInit() {
  }

}
