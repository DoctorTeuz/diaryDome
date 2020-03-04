import { Component, OnInit } from '@angular/core';
import { GeneralFunctionService } from 'src/app/services/general-function.service';
import { MatDialog } from '@angular/material';
import { FormatService } from 'src/app/services/format.service';
import { switchMap } from 'rxjs/operators';
import { CreateFormatPopupComponent } from '../create-format-popup/create-format-popup.component';
import { SHOW_TYPES } from 'src/app/enums/shared-select-info.enum';

@Component({
  selector: 'diaryDome-format-list',
  templateUrl: './format-list.component.html',
  styleUrls: ['./format-list.component.scss']
})
export class FormatListComponent implements OnInit {

  formats;
  viewFormat;
  distinctFormat;

  
  numFormat = 10;
  pagination = 0;
  formatNameFilter;
  formatTypeFilter;
  formatTypeFilterType = SHOW_TYPES;
  actualPage = 1;
  numPage;
  paginationType = [
    5, 10, 25, 50, 100
  ];
  alsoNotAttivo = false;

  noShow: boolean = false;

  constructor(
    public GFService: GeneralFunctionService,
    public dialog: MatDialog,
    public formatService: FormatService,
    ) {
  }

  ngOnInit() {
    this.formats = this.GFService.user.formats;
    if(this.formats.length == 0){

    }
    else{
      this.filterFormat()
    }
  }

  filterFormat(){
    let filteredFormat = this.formats;
    let dFormat = [...new Set(this.formats.map(x => x.Name))].sort()
    if(this.formatNameFilter){
      filteredFormat = filteredFormat.filter(show => show.Name.toLowerCase().indexOf(this.formatNameFilter.toLowerCase()) > -1)
      dFormat = dFormat.filter((show: string) => show.toLowerCase().indexOf(this.formatNameFilter.toLowerCase()) > -1);
    }
    if(this.formatTypeFilter){
      filteredFormat = filteredFormat.filter(show => show.EventType.toLowerCase().indexOf(this.formatTypeFilter.toLowerCase()) > -1)
    }

    if(!this.alsoNotAttivo){
      filteredFormat = filteredFormat.filter(show => show.Attivo == 1);
    }

    this.distinctFormat = dFormat;
    this.viewFormat = filteredFormat.filter((i, index) => (!(index < this.numFormat * this.pagination) && index < (this.numFormat * (this.pagination+1)))).map((i) => {
          return i;
     });
     this.numPage = Math.ceil(filteredFormat.length/this.numFormat);
     this.createPagination();
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
      this.filterFormat();
    }
  }

  activateFormat(format){
    this.formatService.activateFormat(format.formatId).pipe(
      switchMap(res => this.formatService.getFormats(this.GFService.user.ID))
    ).subscribe(
      (res:any) => {
        this.GFService.user.formats = res.body.formats;
        this.ngOnInit();
      }
    )
  }

  deactivateFormat(format){
    this.formatService.deactivateFormat(format.formatId).pipe(
      switchMap(res => this.formatService.getFormats(this.GFService.user.ID))
    ).subscribe(
      (res:any) => {
        this.GFService.user.formats = res.body.formats;
        this.ngOnInit();
      }
    )
  }

  newFormat(){
    const config = {
      component: this
    };
    let dialogRef  = this.dialog.open(CreateFormatPopupComponent, {
      width: '1200px',
      data: config
    })
  }
}
