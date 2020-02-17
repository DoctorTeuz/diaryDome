import { Component, OnInit, OnDestroy, ViewEncapsulation, SecurityContext } from '@angular/core';
import { ShowsService } from 'src/app/services/shows.service';
import { GeneralFunctionService } from 'src/app/services/general-function.service';
import { AngleTranslater } from 'src/app/enums/angle-translater.enum';
import { AngleGenerateService } from 'src/app/services/htmlGenerateService/angle-generate.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'diaryDome-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ShowComponent implements OnInit, OnDestroy {

  angleTranslater = AngleTranslater;
  format;
  completeShowString = new Object();
  
  constructor(
    public showService: ShowsService,
    public GFService: GeneralFunctionService,
    public angleGenerator: AngleGenerateService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    if(this.showService.showDetail){
      console.log(this.showService.showDetail);
      this.format = this.GFService.user.formats.filter(form => form.formatId == this.showService.showDetail[0].formatId)[0];
    }
    else{
      this.GFService.navigateTo('/showList')
    }
  }

  ngOnDestroy(){
    this.showService.showDetail = null;
  }

  generateHTML(segment){
    let type;
    let format;
    let code
    switch (segment.segmentType) {
      case "Angle":
        type = 'angle';
        format = this.format.angleFormat;
        break;
        case "Info":
        case "Hype":
          type = 'info';
          format = this.format.infographicFormat;
          break;
          case "Match":
          case "SpecialMatch":
            type = 'match';
            format = this.format.matchFormat;
            break;
      default:
        break;
    }
    if(typeof this.angleGenerator[type + 'Style' + format] === "function"){
      code = this.angleGenerator[type + 'Style' + format](segment, this.format);
      this.completeShowString[segment.orderAppear] = code;
      return this.sanitizer.bypassSecurityTrustHtml(code);
    }
    else{
      this.completeShowString[segment.orderAppear] = segment.content;
      return segment.content;
    }
  }

  completeShowCodeGenerator(){
    let completeShow = "";
    this.showService.showDetail.map(segment => {
      completeShow = completeShow + this.completeShowString[segment.orderAppear];
    })
    return completeShow;
  }
}
