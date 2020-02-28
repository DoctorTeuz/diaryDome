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
  
  @Output() active = new EventEmitter();
  @Output() deactive = new EventEmitter();

  constructor(
    public GFService: GeneralFunctionService,
  ) { }

  ngOnInit() {
  }

  activateFormat(format){
    this.active.emit(format)
  }

  deactivateFormat(format){
    this.deactive.emit(format)
  }
}
