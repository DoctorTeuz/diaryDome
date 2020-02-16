import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GeneralFunctionService } from 'src/app/services/general-function.service';

@Component({
  selector: 'diaryDome-show-row',
  templateUrl: './show-row.component.html',
  styleUrls: ['./show-row.component.scss']
})
export class ShowRowComponent implements OnInit {

  @Input() showData;
  image;
  format;

  @Output() deleting = new EventEmitter();
  @Output() editing = new EventEmitter();

  constructor(
    public GFService: GeneralFunctionService,
  ) { }

  ngOnInit() {
    this.image = this.showData.imageUrl.split('.')[0];
  }

  deleteShow(show){
    this.deleting.emit(show)
  }

  editShow(show){
    this.editing.emit(show)
  }
}
