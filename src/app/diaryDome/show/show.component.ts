import { Component, OnInit, OnDestroy, ViewEncapsulation, SecurityContext } from '@angular/core';
import { ShowsService } from 'src/app/services/shows.service';
import { GeneralFunctionService } from 'src/app/services/general-function.service';
import { AngleTranslater } from 'src/app/enums/angle-translater.enum';
import { AngleGenerateService } from 'src/app/services/htmlGenerateService/angle-generate.service';
import { DomSanitizer } from '@angular/platform-browser';
import { InfoGenerateService } from 'src/app/services/htmlGenerateService/info-generate.service';
import { MatchGenerateService } from 'src/app/services/htmlGenerateService/match-generate.service';
import { ContestGenerateService } from 'src/app/services/htmlGenerateService/contest-generate.service';
import { GenericAlertPopupComponent } from 'src/app/shared/generic-alert-popup/generic-alert-popup.component';
import { MatDialog } from '@angular/material';
import { switchMap } from 'rxjs/operators';
import { CreateSegmentPopupComponent } from '../create-segment-popup/create-segment-popup.component';

@Component({
  selector: 'diaryDome-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ShowComponent implements OnInit, OnDestroy {

  angleTranslater = AngleTranslater;
  format;
  completeShowString = [];
  completeShowCodeGenerate;
  
  constructor(
    public showService: ShowsService,
    public GFService: GeneralFunctionService,
    public angleGenerator: AngleGenerateService,
    public infoGenerator: InfoGenerateService,
    public matchGenerator: MatchGenerateService,
    public contestGenerator: ContestGenerateService,
    private sanitizer: DomSanitizer,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    if(this.showService.showDetail){
      console.log(this.showService.showDetail);
      this.format = this.GFService.user.formats.filter(form => form.formatId == this.showService.show.formatId)[0];
      console.log(this.format);
      this.showService.showDetail.map(seg => this.generateHTML(seg))
      if(this.showService.show.posted == 1){
        this.completeShowCodeGenerate =  this.completeShowCodeGenerator()
      }
    }
    else{
      this.GFService.navigateTo('/showList')
    }

  }

  ngOnDestroy(){
    this.showService.showDetail = null;
    this.showService.show = null;
  }

  generateHTML(segment){
    let type;
    let format;
    let service;
    let code
    switch (segment.segmentType) {
      case "Angle":
        type = 'angle';
        format = this.format.angleFormat;
        service = 'angleGenerator'
        break;
        case "Info":
        case "Hype":
          type = 'info';
          format = this.format.infographicFormat;
          service = 'infoGenerator'
          break;
          case "Match":
          case "SpecialMatch":
            type = 'match';
            format = this.format.matchFormat;
            service = 'matchGenerator'
            break;
          case 'ShortMatch':
            type = 'match';
            format = 'Short';
            service = 'matchGenerator'
          case 'Plain':
            type = 'plain';
            break;
      default:
        break;
    }
    if(type != 'plain' && typeof this[service][type + 'Style' + format] === "function"){
      code = this[service][type + 'Style' + format](segment, this.format);
      let obj = {
        code: code,
        place: segment.placement,
        order: segment.orderAppear,
        splrText: segment.rating ? segment.title + " (" + segment.rating + ")<br>" : null,
      }
      this.completeShowString.push(obj);
      /* return this.sanitizer.bypassSecurityTrustHtml(code); */
    }
    else{
      let obj = {
        code: '<div style="width: 100%;">'+segment.content+'</div>',
        place: segment.placement,
        order: segment.orderAppear,
        splrText: segment.rating ? segment.title + " (" + segment.rating + ")<br>" : null,
      }
      this.completeShowString.push(obj);
      /* return this.sanitizer.bypassSecurityTrustHtml(obj.code); */
    }
  }

  completeShowCodeGenerator(isAnteprima?){
    let completeShow = "";
    let spoilerText = "";
    let preshow = this.completeShowString.filter(segment => {
      return segment.place == 'PreShow';
    })
    let show = this.completeShowString.filter(segment => {
      return segment.place == 'Show';
    })
    let postShow = this.completeShowString.filter(segment => {
      return segment.place == 'PostShow';
    })

    completeShow = completeShow + this.contestGenerator['showStyleOpening' + this.format.headerFormat]();
    if(preshow.length>0){
			if(this.showService.show.eventType == 'PPV'){
				completeShow = completeShow + '<br><b>KICKOFF SHOW</b><br><br>';
			}
			else{
				completeShow = completeShow + '<br><b>PRE SHOW</b><br><br>';
			}
		}
    preshow.map(segment => {
      completeShow = completeShow + segment.code;
      spoilerText = segment.splrText ? spoilerText + segment.splrText : spoilerText;
    })
      completeShow = completeShow + this.contestGenerator['showStyleHeader' + this.format.headerFormat](this.showService.show, this.format);
    show.map(segment => {
      completeShow = completeShow + segment.code;
      spoilerText = segment.splrText ? spoilerText + segment.splrText : spoilerText;
    })

    if(postShow.length>0){
			completeShow = completeShow + '<br><center><b>POST SHOW</b></center><br><br>';
			spoilerText = spoilerText + "<br>";
    }
    
    postShow.map(segment => {
      completeShow = completeShow + segment.code;
      spoilerText = segment.splrText ? spoilerText + segment.splrText : spoilerText;
    })
    completeShow = completeShow + this.contestGenerator.showStyleEnding();
    if(!isAnteprima && spoilerText){
      completeShow = completeShow + '[SPOILER]' + spoilerText + '[/SPOILER]';
    }
    return completeShow;
  }

  segmentEdit(segment){

  }

  goBack(){
    this.GFService.navigateTo('/showList');
  }

  deleteShow(){
    let message = 'Sei sicuro di voler cancellare ' + this.showService.show.showName + '?';
    let title = 'Attenzione';
    const config = {
      component: this,
      function: 'deleteAction',
      message: message,
      header: title,
      level: 'H',
      callbackParams: {
        id: this.showService.show.ID,
      }
    };
    this.dialog.open(GenericAlertPopupComponent, {
      width: '400px',
      data: config
    })
  }

  publishShow(){
    const show = this.showService.show;
    this.GFService.countThread(true);
    try {
      this.showService.publishShow(show.ID).subscribe(
          (res: any) => {
            if(res){
              this.completeShowCodeGenerate =  this.completeShowCodeGenerator();
              this.showService.show.posted = 1;
            }
          }
        )
    } catch (error) {
      this.GFService.countThread(false);
      console.log(error)
    }
  
  }

  newSegment(){
    let config = {
      action: 'create',
      format: this.format,
      show: this.showService.show
    };
    this.dialog.open(CreateSegmentPopupComponent, {
      width: '800px',
      data: config
    })
    
  }
}
