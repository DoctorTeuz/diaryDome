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
  preShow;
  mainShow;
  postShow;

  
  constructor(
    public showService: ShowsService,
    public GFService: GeneralFunctionService,
    public angleGenerator: AngleGenerateService,
    public infoGenerator: InfoGenerateService,
    public matchGenerator: MatchGenerateService,
    public contestGenerator: ContestGenerateService,
    public sanitizer: DomSanitizer,
    public dialog: MatDialog,
  ) {
    
   }

  ngOnInit() {
    this.completeShowString = [];
    if(this.showService.showDetail){
      this.format = this.GFService.user.formats.filter(form => form.formatId == this.showService.show.formatId)[0];
      this.showService.showDetail = this.showService.showDetail.sort((a, b) => {
        if(a.placement == 'PreShow' && b.placement != 'Preshow'){
          return -1;
        }
        if(a.placement == 'PostShow' && b.placement != 'PostShow'){
          return 1;
        }
        if(a.placement == 'Show' && b.placement == 'PostShow'){
          return -1;
        }
        if(a.placement == 'Show' && b.placement == 'PreShow'){
          return 1;
        }
        if(a.placement == b.placement ){
          return parseInt(a.orderAppear) < parseInt(b.orderAppear) ? -1 : 1
        }
      })
      this.preShow = this.showService.showDetail.filter(segment => {
        return segment.placement == 'PreShow';
      })
      this.mainShow = this.showService.showDetail.filter(segment => {
        return segment.placement == 'Show';
      })
      this.postShow = this.showService.showDetail.filter(segment => {
        return segment.placement == 'PostShow';
      })


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

  generateHTML(segment, edit?){
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
            break;
          case 'Plain':
            type = 'plain';
            break;
      default:
        break;
    }
    let obj;
    if(type != 'plain' && typeof this[service][type + 'Style' + format] === "function"){
      code = this[service][type + 'Style' + format](segment, this.format);
      obj = {
        id: segment.segmentId,
        code: code,
        place: segment.placement,
        order: segment.orderAppear,
        splrText: segment.rating ? segment.title + " (" + segment.rating + ")<br>" : null,
      }
      /* return this.sanitizer.bypassSecurityTrustHtml(code); */
    }
    else{
      obj = {
        id: segment.segmentId,
        code: '<div style="width: 100%;">'+segment.content+'</div>',
        place: segment.placement,
        order: segment.orderAppear,
        splrText: segment.rating ? segment.title + " (" + segment.rating + ")<br>" : null,
      }
    }
    if(edit){
      this.completeShowString = this.completeShowString.map(seg => {
          if(seg.id != obj.id){
            return seg;
          }
      });
    }
    this.completeShowString.push(obj);
    
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
      completeShow = completeShow + segment.code + "<br><br>";
      spoilerText = segment.splrText ? spoilerText + segment.splrText : spoilerText;
    })
      completeShow = completeShow + this.contestGenerator['showStyleHeader' + this.format.headerFormat](this.showService.show, this.format);
    show.map(segment => {
      completeShow = completeShow + segment.code + "<br><br>";
      spoilerText = segment.splrText ? spoilerText + segment.splrText : spoilerText;
    })

    if(postShow.length>0){
			completeShow = completeShow + '<br><center><b>POST SHOW</b></center><br><br>';
			spoilerText = spoilerText + "<br>";
    }
    
    postShow.map(segment => {
      completeShow = completeShow + segment.code + "<br><br>";
      spoilerText = segment.splrText ? spoilerText + segment.splrText : spoilerText;
    })
    completeShow = completeShow + this.contestGenerator.showStyleEnding();
    if(!isAnteprima && spoilerText){
      completeShow = completeShow + '[SPOILER]' + spoilerText + '[/SPOILER]';
    }
    return this.GFService.richText(this.GFService.clearText(completeShow));
  }

  segmentEdit(segment, Event){
    Event.stopPropagation();
    let config = {
      action: 'edit',
      format: this.format,
      show: this.showService.show,
      segment: segment,
      component: this
    };
    this.dialog.open(CreateSegmentPopupComponent, {
      width: '1200px',
      data: config
    })
  }

  deleteSegment(segment, Event){
    Event.stopPropagation();
    let message = 'Sei sicuro di voler cancellare il segmento "' + segment.title + '"?';
    let title = 'Attenzione';
    const config = {
      component: this,
      function: 'deleteSegmentAction',
      message: message,
      header: title,
      level: 'H',
      callbackParams: {
        id: segment.segmentId
      }
    };
    this.dialog.open(GenericAlertPopupComponent, {
      width: '400px',
      data: config
    })
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

  deleteSegmentAction(params){
    const id = params.id; 
    this.GFService.countThread(true);
    this.showService.deleteSegment(id).pipe(
      switchMap(res => this.showService.getShowDetail(this.showService.show.ID))
    ).subscribe(
      (res: any) => {
        if(res.body.showDetail){
          this.GFService.countThread(false);
          let detail = this.showService.mapSegment(res.body.showDetail);         
          this.showService.showDetail = detail;
          this.ngOnInit();
        }
        else{
          if(res.body == 'Nessuno Show Trovato'){
            
          }
        }
      }
    );
  }

  deleteAction(params){
    const id = params.id; 
    this.GFService.countThread(true);
    this.showService.deleteShow(id).subscribe(
      (res: any) => {
        if(res.body.showList){
          
          this.GFService.countThread(false);
          this.GFService.navigateTo('/showList');
        }
        else{
          if(res.body == 'Nessuno Show Trovato'){
            
          }
        }
      }
    );
  }

  publishShow(){
    const show = this.showService.show;
    this.GFService.countThread(true);
    try {
      this.showService.publishShow(show.ID).subscribe(
          (res: any) => {
            if(res){
              this.GFService.countThread(false);
              this.completeShowCodeGenerate =  this.completeShowCodeGenerator();
              this.showService.show.posted = '1';
            }
          }
        )
    } catch (error) {
      this.GFService.countThread(false);
      console.log(error)
    }
  
  }

  depublishShow(){
    const show = this.showService.show;
    this.GFService.countThread(true);
    try {
      this.showService.depublishShow(show.ID).subscribe(
          (res: any) => {
            if(res){
              this.GFService.countThread(false);
              this.completeShowCodeGenerate =  this.completeShowCodeGenerator();
              this.showService.show.posted = '0';
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
      show: this.showService.show,
      component: this
    };
    this.dialog.open(CreateSegmentPopupComponent, {
      width: '1200px',
      data: config
    })
    
  }

  moveSegment(segment, movement, Event){
    Event.stopPropagation();
    let index;
    for(let i = 0; i<this.showService.showDetail.length; i++){
      let seg = this.showService.showDetail[i];
      if(seg.segmentId == segment.segmentId){
        index = i;
        break;
      }
    }

    let segmentB = movement == 'before' ? this.showService.showDetail[index - 1] :  this.showService.showDetail[index + 1];

    let config = {
      segmentA: segment.segmentId,
      segmentB: segmentB.segmentId,
      segAnewPos: segmentB.orderAppear,
      segBnewPos: segment.orderAppear,
      userId: this.GFService.user.ID,
      showId: this.showService.show.ID,
    }

    this.GFService.countThread(true);
    this.showService.moveSegment(config).subscribe(
      (res: any) => {
        if(res.body.showDetail){
          this.GFService.countThread(false);
          let detail = this.showService.mapSegment(res.body.showDetail);         
          this.showService.showDetail = detail;
          this.ngOnInit();
        }
        else{
          if(res.body == 'Nessuno Show Trovato'){
            
          }
        }
      }
    )
  }

  getCode(segment){
    return this.completeShowString.filter(seg => seg.id == segment.segmentId)[0].code;
  }
}
