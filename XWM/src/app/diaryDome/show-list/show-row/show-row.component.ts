import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GeneralFunctionService } from 'src/app/services/general-function.service';
import { ShowsService } from 'src/app/services/shows.service';
import { switchMap } from 'rxjs/operators';

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
    this.GFService.countThread(true);
    try {
      this.showService.getShowDetail(show.ID).subscribe(
        (res: any) => {
          this.GFService.countThread(false);
          this.showService.show = show;
          let detail = this.showService.mapSegment(res.body.showDetail);         
          this.showService.showDetail = detail;
          this.GFService.navigateTo('/show');
        }
      )
    } catch (error) {
      this.GFService.countThread(false);
      console.log(error)
    }
  }

  
  publishShow(show){
    this.GFService.countThread(true);
    try {
      this.showService.publishShow(show.ID).pipe(
        switchMap(res => this.showService.getShowDetail(show.ID))
        ).subscribe(
          (res: any) => {
            this.GFService.countThread(false);
            show.posted = '1';
            this.showService.show = show;
            this.showService.showDetail = res.body.showDetail;
            this.GFService.navigateTo('/show');
          }
        )
    } catch (error) {
      this.GFService.countThread(false);
      console.log(error)
    }
  }

  depublishShow(show){
    this.GFService.countThread(true);
    try {
      this.showService.depublishShow(show.ID).subscribe(
          (res: any) => {
            this.GFService.countThread(false);
            show.posted = '0';
          }
        )
    } catch (error) {
      this.GFService.countThread(false);
      console.log(error)
    }
  }
}
