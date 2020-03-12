import { Component, OnInit, Inject } from '@angular/core';
import { Format } from 'src/app/objects/format';
import { GeneralFunctionService } from 'src/app/services/general-function.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SHOW_TYPES, SHOW_TYPES_SELECT, WEEK_DAYS, CONTEXT_TYPE, MATCH_TYPE, ANGLE_TYPE} from 'src/app/enums/shared-select-info.enum';
import { DomSanitizer } from '@angular/platform-browser';
import { AngleGenerateService } from 'src/app/services/htmlGenerateService/angle-generate.service';
import { InfoGenerateService } from 'src/app/services/htmlGenerateService/info-generate.service';
import { MatchGenerateService } from 'src/app/services/htmlGenerateService/match-generate.service';
import { ContestGenerateService } from 'src/app/services/htmlGenerateService/contest-generate.service';
import { Show } from 'src/app/objects/show';
import { Segment } from 'src/app/objects/segment';
import { redo } from '@syncfusion/ej2-angular-richtexteditor';
import { FormatService } from 'src/app/services/format.service';
import { switchMap } from 'rxjs/operators';

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
  matchStyles = MATCH_TYPE;
  angleStyles = ANGLE_TYPE;

  baseGroup: boolean = false;
  contextGroup: boolean = false;
  matchGroup: boolean = false;
  angleGroup: boolean = false;
  infoGroup: boolean = false;
  formData:FormData;

  loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
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
      public formatService: FormatService,
    ) {
      dialogRef.disableClose = true;
      this.formData = new FormData();
  }

  ngOnInit() {

  }

  fileUploaded(event) { // called each time file input changes
    let fileList: FileList = event.target.files;
    if (fileList && fileList[0]) {
      let file: File = fileList[0];
      var reader = new FileReader();

      reader.readAsDataURL(fileList[0]); // read file as data url
      this.format.File = file;
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
      case 1:
        this.contextGroup = (this.format.headerFormat);
        return !this.contextGroup;
      case 2:
        this.matchGroup = (this.format.matchFormat);
        return !this.matchGroup;
      case 3:
        this.angleGroup = (this.format.angleFormat);
        return !this.angleGroup;
      case 4:
        this.infoGroup = (this.format.infographicFormat);
        return !this.infoGroup;
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
    
    return this.contestGenerator['showStyleOpening' + this.format.headerFormat]() 
          + this.contestGenerator['showStyleHeader' + this.format.headerFormat](show, this.format)
          + this.loremIpsum + this.contestGenerator.showStyleEnding();
  }

  getMatch(){
    let segment : Segment = new Segment();
    segment.content = this.loremIpsum;
    segment.showId = 0;
    segment.championship = "WWE Universal";
    segment.matchType = "Single Match";
    segment.matchScheme = "??? vs ???";
    segment.matchWorkers = "Unknownkyky_2|VVSS|Unknownkyky_2";
    segment.matchWinner = "???";
    segment.titleChange = true;

    return this.matchGenerator['matchStyle' + this.format.matchFormat](segment, this.format);
  }
  
  getAngle(){
    let segment : Segment = new Segment();
    segment.content = this.loremIpsum;
    segment.showId = 0;
    segment.shownTitle = "Titolo";

    return this.angleGenerator['angleStyle' + this.format.angleFormat](segment, this.format);
  }

  getInfo(){
    let segment : Segment = new Segment();
    segment.content = this.loremIpsum;
    segment.showId = 0;
    segment.shownTitle = "Titolo";

    return this.infoGenerator['infoStyle' + this.format.infographicFormat](segment, this.format);
  }

  buildWorkerPicture(){
    let infos: Array<any> = [];
    if(this.dimension){
      infos.push('Little');
    }
    if(this.border){
      infos.push('Border')
    }
    if(this.angles != 'Acute'){
      infos.push(this.angles)
    }

    this.format.workerImageShape = infos.length > 0 ? infos.join(" ") : "";
  }

  createFormat(){
    this.format.Label = this.format.Name;
    const formData = new FormData();
    formData.append('formatLogo', this.format.File);

/*     this.formatService.createFormat(this.format).pipe(
        switchMap( res => this.formatService.uploadLogo(this.formData, headers))
      ).subscribe(
      res => {
        console.log(res)
      }
    ) */
    this.formatService.uploadLogo(formData).subscribe()
  }

  close(){
    this.dialogRef.close()
  }
}
