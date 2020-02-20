import { Component, OnInit, Inject } from '@angular/core';
import { GeneralFunctionService } from 'src/app/services/general-function.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ShowsService } from 'src/app/services/shows.service';

@Component({
  selector: 'diaryDome-create-show-popup',
  templateUrl: './create-show-popup.component.html',
  styleUrls: ['./create-show-popup.component.scss']
})
export class CreateShowPopupComponent implements OnInit {

  activeFormats;
  pickedFormat;
  showLabel;
  year;
  week;
  month;
  attendance;
  arena;
  city;
  soldout;
  rating;

  formatEdit;

  dateType;
  showId;
  component;
  redirect;
  action = 'create';

  constructor(
    public GFService: GeneralFunctionService,
    public dialogRef: MatDialogRef<CreateShowPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    public showService: ShowsService,
  ) {
    dialogRef.disableClose = true;
    this.component = data.component;
    this.redirect = data.redirect;
    if(data.action){
      this.action = data.action;
      this.formatEdit = data.show.formatId;
      this.showLabel = data.show.showName;
      this.year = data.show.year;
      this.week = data.show.week;
      this.month = data.show.month;
      this.attendance = data.show.pubblico;
      this.arena = data.show.arena;
      this.city = data.show.city;
      this.soldout = data.show.soldOut == '1';
      this.rating = data.show.voto;
      this.showId = data.show.ID;
    }
  }


  ngOnInit() {
    this.activeFormats = this.GFService.user.formats.filter(formats => formats.Attivo == '1');
    this.dateType = this.GFService.user.dateFormat;
    if(this.action == 'edit'){
      this.pickedFormat = this.activeFormats.filter(format => format.formatId == this.formatEdit)[0];
    }
  }

  actionDispatcher(){
    if(this.action == 'create'){
      this.createShow();
      return;
    }
    if(this.action == 'edit'){
      this.editShow();
      return;
    }
  }
  createShow(){
    const newShow = {
      showLabel: this.showLabel,
      year: this.year,
      eventType: this.pickedFormat.EventType,
      formatID: this.pickedFormat.formatId,
      dayWeek: this.pickedFormat.DayWeek,
      week: this.week,
      month: this.month,
      attendance: this.attendance ? this.attendance : null,
      arena: this.arena,
      city: this.city,
      soldout: this.soldout ? 1 : 0,
      rating: this.rating,
      showPicture: this.pickedFormat.Picture,
      userId: this.GFService.user.ID
    }
    this.GFService.countThread(true);
    this.showService.createShow(newShow).subscribe(
      (res: any) => {
        this.GFService.countThread(false);
         if(res.body.showList){
           if(this.component && !this.redirect){
            this.component.shows = res.body.showList;
            this.component.filterShow();
           }
           else if(this.redirect){
             this.GFService.navigateTo('/showList');
           }
        }
        else{
          if(res.body == 'Nessuno Show Trovato'){
            this.component.noShow = true;
          }
        }
        this.close();
      }
    );
  }

  editShow(){
    const updShow = {
      showLabel: this.showLabel,
      year: this.year,
      week: this.week,
      month: this.month,
      attendance: this.attendance,
      arena: this.arena,
      city: this.city,
      soldout: this.soldout ? 1 : 0,
      rating: this.rating,
      userId: this.GFService.user.ID,
      showId: this.showId,
    }
    this.GFService.countThread(true);
    this.showService.updateShow(updShow).subscribe(
      (res: any) => {
        this.GFService.countThread(false);
         if(res.body.showList){
           if(this.component && !this.redirect){
            this.component.shows = res.body.showList;
            this.component.filterShow();
           }
           else if(this.redirect){
             this.GFService.navigateTo('/showList');
           }
        }
        else{
          if(res.body == 'Nessuno Show Trovato'){
            this.component.noShow = true;
          }
        }
        this.close();
      }
    );
  }

  checkConfirm(){
    return !(this.dateType == 'TEW' ?  
              this.year && this.week && this.month && this.rating : 
              this.year && this.rating);
  }

  changeFormat(){
    this.showLabel = this.pickedFormat.Name;
  }

  close(){
    this.dialogRef.close()
  }
}
