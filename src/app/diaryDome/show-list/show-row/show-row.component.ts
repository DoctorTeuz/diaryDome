import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GeneralFunctionService } from 'src/app/services/general-function.service';
import { ShowsService } from 'src/app/services/shows.service';

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
    public showService: ShowsService,
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

  goToDetail(show){
    try {
      this.showService.getShowDetail(show.ID).subscribe(
        (res: any) => {
          this.showService.showDetail = res.body.showDetail;
          this.GFService.navigateTo('/show');
        }
      )
    } catch (error) {
      console.log(error)
    }
  }
}
