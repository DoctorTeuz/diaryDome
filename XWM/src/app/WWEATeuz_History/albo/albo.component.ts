import { Component, OnInit } from '@angular/core';
import { GeneralFunctionService } from 'src/app/services/general-function.service';
import { AlboService } from 'src/app/services/albo.service';
import { Titles } from 'src/app/enums/titles.enum';

@Component({
  selector: 'diaryDome-albo',
  templateUrl: './albo.component.html',
  styleUrls: ['./albo.component.scss']
})
export class AlboComponent implements OnInit {

  alboDatas;
  distinctTitlesMR;
  distinctTitlesNXT;
  pickedTitle = null;
  pickedTitleAlbo = null;
  TitlesEnum = Titles;

  constructor(
    public GFService: GeneralFunctionService,
    public alboService: AlboService,
    ) {
      this.GFService.getTeuzLastShowDateAction();
    }

  ngOnInit() {
    this.GFService.countThread(true);
    this.alboService.getAlboList().subscribe(
      (res: any) => {
        this.GFService.countThread(false);
        this.alboDatas = res.body.albo;
        this.distinctTitlesMR = [...new Set(this.alboDatas.filter(x => x.MainRoster == 1).map(x => x.Title))];
        this.distinctTitlesNXT = [...new Set(this.alboDatas.filter(x => x.MainRoster != 1).map(x => x.Title))];
        console.log(this.alboDatas);
        console.log(this.distinctTitlesMR);
        console.log(this.distinctTitlesNXT);
      }
    )
  }


}
