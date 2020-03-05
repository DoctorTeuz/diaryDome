import { Component, OnInit, Input } from '@angular/core';
import { GeneralFunctionService } from 'src/app/services/general-function.service';
import { Titles } from 'src/app/enums/titles.enum';

@Component({
  selector: 'diaryDome-accordion-albo',
  templateUrl: './accordion-albo.component.html',
  styleUrls: ['./accordion-albo.component.scss']
})
export class AccordionAlboComponent implements OnInit {

  pickedTitle = null;
  pickedTitleAlbo = null;
  TitlesEnum = Titles;
  @Input() distinctTitles;
  @Input() alboData;
  @Input() MR;

  constructor(
    public GFService: GeneralFunctionService,
  ) { }

  ngOnInit() {
  }

  pickTitle(title){
    if(this.pickedTitle === title){
      this.pickedTitle = null;
      this.pickedTitleAlbo = null;
    }
    else{
      this.pickedTitle = title
      this.pickedTitleAlbo = this.alboData.filter(t => t.Title == title);
      window.location.hash = ''; 
      window.location.hash = 'picketTitlePlate'+this.MR;
    }
  }

  calcoloRegni(campione, kind){
    let numRegni;
    if(kind == 'Single'){
      let numReigns = this.pickedTitleAlbo.filter(c => c.Champion == campione.Champion).filter(c => parseInt(c.ID) <= parseInt(campione.ID)).length;
      numRegni = (numReigns > 1 ? ' (' + numReigns + ')' : '');
    }
    else if(kind == 'Tag'){
      const Champions = campione.TagComposition.map(c => {
        let numReigns = this.pickedTitleAlbo.filter(c2 => c2.TagComposition.filter(t => t == c && parseInt(t.ID) <= parseInt(c.ID)).length > 0).length
        return c + (numReigns > 1 ? ' (' + numReigns + ')' : '');
      })
      numRegni = Champions.join(', ');
    }
    return numRegni;
  }

}                
