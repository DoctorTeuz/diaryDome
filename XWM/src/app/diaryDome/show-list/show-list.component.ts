import { Component, OnInit } from '@angular/core';
import { ShowsService } from 'src/app/services/shows.service';
import { GeneralFunctionService } from 'src/app/services/general-function.service';
import { MatDialog } from '@angular/material';
import { CreateShowPopupComponent } from 'src/app/diaryDome/create-show-popup/create-show-popup.component'
import { GenericAlertPopupComponent } from 'src/app/shared/generic-alert-popup/generic-alert-popup.component';
import { SHOW_TYPES } from 'src/app/enums/shared-select-info.enum';

@Component({
  selector: 'diaryDome-show-list',
  templateUrl: './show-list.component.html',
  styleUrls: ['./show-list.component.scss']
})
export class ShowListComponent implements OnInit {

  shows;
  viewShow;
  numShow = 10;
  pagination = 0;
  distinctShow;
  showNameFilter;
  showTypeFilter;
  showSoldOutFilter;
  showTypeFilterType = SHOW_TYPES;
  actualPage = 1;
  numPage;
  paginationType = [
    5, 10, 25, 50, 100
  ]

  noShow: boolean = false;

  constructor(
    public showsService: ShowsService,
    public GFService: GeneralFunctionService,
    public dialog: MatDialog,
  ) {
    
  }

  ngOnInit() {
    
    this.GFService.countThread(true);
    this.showsService.getShowList().subscribe(
      (res: any) => {
        if(res.body.showList){
          this.shows = res.body.showList;
          this.GFService.countThread(false);
          this.filterShow()
          console.log(this.distinctShow);
        }
        else{
          if(res.body == 'Nessuno Show Trovato'){
            this.noShow = true;
          }
        }
      }
    )
  }

  filterShow(){
    let filteredShow = this.shows;
    let dShow = [...new Set(this.shows.map(x => x.showName))].sort()
    if(this.showNameFilter){
      filteredShow = filteredShow.filter(show => show.showName.toLowerCase().indexOf(this.showNameFilter.toLowerCase()) > -1)
      this.distinctShow = dShow.filter((show: string) => show.toLowerCase().indexOf(this.showNameFilter.toLowerCase()) > -1);
    }
    if(this.showTypeFilter){
      filteredShow = filteredShow.filter(show => show.eventType.toLowerCase().indexOf(this.showTypeFilter.toLowerCase()) > -1)
    }
    if(this.showSoldOutFilter){
      filteredShow = filteredShow.filter(show => show.soldOut == '1')
    }

    this.viewShow = filteredShow.filter((i, index) => (!(index < this.numShow * this.pagination) && index < (this.numShow * (this.pagination+1)))).map((i) => {
          return i;
     });
     this.numPage = Math.ceil(filteredShow.length/this.numShow);
     this.createPagination();
     
  }

  newShow(){
    const config = {
      component: this
    };
    let dialogRef  = this.dialog.open(CreateShowPopupComponent, {
      width: '800px',
      data: config
    })
  }

  editShow(show){
    const config = {
      component: this,
      action: 'edit',
      show: show
    };
    let dialogRef  = this.dialog.open(CreateShowPopupComponent, {
      width: '800px',
      data: config
    })
  }


  deleteShow(show){
    let message = 'Sei sicuro di voler cancellare ' + show.showName + '?';
    let title = 'Attenzione';
    const config = {
      component: this,
      function: 'deleteAction',
      message: message,
      header: title,
      level: 'H',
      callbackParams: {
        id: show.ID,
      }
    };
    this.dialog.open(GenericAlertPopupComponent, {
      width: '400px',
      data: config
    })
  }

  deleteAction(params){
    const id = params.id; 
    this.GFService.countThread(true);
    this.showsService.deleteShow(id).subscribe(
      (res: any) => {
        if(res.body.showList){
          this.shows = res.body.showList;
          this.GFService.countThread(false);
          this.filterShow()
          console.log(this.distinctShow);
        }
        else{
          if(res.body == 'Nessuno Show Trovato'){
            this.noShow = true;
          }
        }
      }
    );
  }

  pageTot(){
    let numPages = this.numPage;
    let pages = [];
    for (let index = 0; index < numPages; index++) {
      pages.push(index+1);
    }
    return pages;
  }

  pagesToShow = [];
  createPagination(){
    this.pagesToShow = [];
    let points;
    let numPages = this.numPage;
    for(let page = 1; page < numPages; page++){
      if((page < 2 && this.actualPage > 2) 
        || (page < 4 && this.actualPage < 4) 
        || numPages < 6 
        || page == this.actualPage
        || (page > (this.actualPage - 2) 
          && page < (this.actualPage + 2)) 
        || page >  numPages - 2
        || (this.actualPage == (numPages-1) && page > numPages - 4)){
          points = false;
          this.pagesToShow.push(page);
      }
      else if(!points){
          points = true;
          this.pagesToShow.push('...');
      }
    }
  }
  

  goToPage(page){
    if(page != '...'){
      this.actualPage = page;
      this.pagination = page - 1;
      this.filterShow();
    }
  }
}
