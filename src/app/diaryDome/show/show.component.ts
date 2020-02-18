import { Component, OnInit, OnDestroy, ViewEncapsulation, SecurityContext } from '@angular/core';
import { ShowsService } from 'src/app/services/shows.service';
import { GeneralFunctionService } from 'src/app/services/general-function.service';
import { AngleTranslater } from 'src/app/enums/angle-translater.enum';
import { AngleGenerateService } from 'src/app/services/htmlGenerateService/angle-generate.service';
import { DomSanitizer } from '@angular/platform-browser';
import { InfoGenerateService } from 'src/app/services/htmlGenerateService/info-generate.service';
import { MatchGenerateService } from 'src/app/services/htmlGenerateService/match-generate.service';
import { ContestGenerateService } from 'src/app/services/htmlGenerateService/contest-generate.service';

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
  
  constructor(
    public showService: ShowsService,
    public GFService: GeneralFunctionService,
    public angleGenerator: AngleGenerateService,
    public infoGenerator: InfoGenerateService,
    public matchGenerator: MatchGenerateService,
    public contestGenerator: ContestGenerateService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    if(this.showService.showDetail){
      console.log(this.showService.showDetail);
      this.format = this.GFService.user.formats.filter(form => form.formatId == this.showService.show.formatId)[0];
      console.log(this.format);
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
      default:
        break;
    }
    if(typeof this[service][type + 'Style' + format] === "function"){
      code = this[service][type + 'Style' + format](segment, this.format);
      let obj = {
        code: code,
        place: segment.placement,
        order: segment.orderAppear,
        splrText: segment.title + " (" + segment.rating + ")<br>"
      }
      this.completeShowString.push(obj);
      return this.sanitizer.bypassSecurityTrustHtml(code);
    }
    else{
      let obj = {
        code: segment.content,
        place: segment.placement,
        order: segment.orderAppear,
        splrText: segment.rating ? segment.title + " (" + segment.rating + ")<br>" : null,
      }
      this.completeShowString.push(obj);
      return this.sanitizer.bypassSecurityTrustHtml(segment.content);
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
      spoilerText = spoilerText + segment.splrText;
    })
      completeShow = completeShow + this.contestGenerator['showStyleHeader' + this.format.headerFormat](this.showService.show, this.format);
    show.map(segment => {
      completeShow = completeShow + segment.code;
      spoilerText = spoilerText + segment.splrText;
    })

    if(postShow.length>0){
			completeShow = completeShow + '<br><center><b>POST SHOW</b></center><br><br>';
			spoilerText = spoilerText + "<br>";
    }
    
    postShow.map(segment => {
      completeShow = completeShow + segment.code;
      spoilerText = spoilerText + segment.splrText;
    })
    completeShow = completeShow + this.contestGenerator.showStyleEnding();
    if(!isAnteprima && spoilerText){
      completeShow = completeShow + '[SPOILER]' + spoilerText + '[/SPOILER]';
    }
    return completeShow;
  }
}
