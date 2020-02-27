import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from 'events';
import { GeneralFunctionService } from 'src/app/services/general-function.service';

@Component({
  selector: 'diaryDome-format-row',
  templateUrl: './format-row.component.html',
  styleUrls: ['./format-row.component.scss']
})
export class FormatRowComponent implements OnInit {

  @Input() formatData;
  image;
  format;

  constructor(
    public GFService: GeneralFunctionService,
  ) { }

  ngOnInit() {
  }

}
