import { Component, OnInit, Inject } from '@angular/core';
import { Format } from 'src/app/objects/format';
import { GeneralFunctionService } from 'src/app/services/general-function.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SHOW_TYPES, SHOW_TYPES_SELECT, WEEK_DAYS, CONTEXT_TYPE } from 'src/app/enums/shared-select-info.enum';
import { DomSanitizer } from '@angular/platform-browser';
import { AngleGenerateService } from 'src/app/services/htmlGenerateService/angle-generate.service';
import { InfoGenerateService } from 'src/app/services/htmlGenerateService/info-generate.service';
import { MatchGenerateService } from 'src/app/services/htmlGenerateService/match-generate.service';
import { ContestGenerateService } from 'src/app/services/htmlGenerateService/contest-generate.service';
import { Show } from 'src/app/objects/show';
import { redo } from '@syncfusion/ej2-angular-richtexteditor';

@Component({
  selector: 'diaryDome-create-format-popup',
  templateUrl: './create-format-popup.component.html',
  styleUrls: ['./create-format-popup.component.scss']
})
export class CreateFormatPopupComponent implements OnInit {

  format: Format = new Format();
  showType = SHOW_TYPES_SELECT;
  dayWeek = WEEK_DAYS;
  imgFakeUrl;

  headerStyles = CONTEXT_TYPE;

  baseGroup = false;

  angles = "Acute";
  dimension = false;
  border = false;


  constructor(    
      public GFService: GeneralFunctionService,
      public dialogRef: MatDialogRef<CreateFormatPopupComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any, 
      public sanitizer: DomSanitizer,
      public angleGenerator: AngleGenerateService,
      public infoGenerator: InfoGenerateService,
      public matchGenerator: MatchGenerateService,
      public contestGenerator: ContestGenerateService,
    ) {
      dialogRef.disableClose = true;
  }

  ngOnInit() {
    this.format.soldOutColor = '#FF0000';
  }

  fileUploaded(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url
      this.format.File = event.target.files[0];
      reader.onload = (ev) => { // called once readAsDataURL is completed
        this.format.Picture = ev.target['result'];
      }
    }
  }

  checkNext(page){
    switch (page) {
      case 0:
        this.baseGroup = (this.format.Name && this.format.EventType && this.dayWeek && this.format.File);
        return !this.baseGroup;
        break;
      default:
        break;
    }
  }

  getHeader(){
    const show = {
      urlImage: this.format.Picture,
      showName: this.format.Label,
      dayWeek: this.format.DayWeek,
      week: 'Seconda',
      month: 'Mese',
      year: 'Anno',
      arena: 'Arena',
      city: 'Città',
      pubblico: 1000,
      soldOut: 1,
      baseColor: this.format.soldOutColor ? this.format.soldOutColor : 'red',
    };

    const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

    return this.contestGenerator['showStyleOpening' + this.format.headerFormat]() 
          + this.contestGenerator['showStyleHeader' + this.format.headerFormat](show, this.format)
          + loremIpsum + this.contestGenerator.showStyleEnding();
  }
  
  buildWorkerPicture(){
    let infos: Array<any>;
    if(this.dimension){
      infos.push('Little');
    }
    if(this.border){
      infos.push('Border')
    }
    if(this.angles != 'Acute'){
      infos.push(this.angles)
    }

    this.format.workerImageShape = infos.join(" ");
  }


  close(){
    this.dialogRef.close()
  }
}
