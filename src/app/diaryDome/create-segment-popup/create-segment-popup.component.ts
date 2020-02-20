import { Component, OnInit, Inject } from '@angular/core';
import { GeneralFunctionService } from 'src/app/services/general-function.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CreateShowPopupComponent } from '../create-show-popup/create-show-popup.component';
import { ShowsService } from 'src/app/services/shows.service';

@Component({
  selector: 'true-create-segment-popup',
  templateUrl: './create-segment-popup.component.html',
  styleUrls: ['./create-segment-popup.component.scss']
})
export class CreateSegmentPopupComponent implements OnInit {
  
  segment = new Object();
  action = 'create';
  format;
  show;

  segmentTypeList = [
    {label: 'Angle', value: 'Angle'},
    {label: 'Match', value: 'Match'},
    {label: 'SpecialMatch', value: 'Special Match'},
    {label: 'ShortMatch', value: 'Recap Breve di un incontro'},
    {label: 'Info', value: 'Infografica'},
    {label: 'Hype', value: 'Infografica promozionale'},
    {label: 'Plain', value: 'Senza Grafica'},
  ];

  placementList = [
    {label: 'PreShow', value: 'Pre-Show o Kickoff'},
    {label: 'Show', value: 'Show'},
    {label: 'PostShow', value: 'Post Show o Dark Show'},
  ];

  constructor(
    public GFService: GeneralFunctionService,
    public dialogRef: MatDialogRef<CreateShowPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    public showService: ShowsService,
    ) {
      if(this.GFService.user.ID === 1){
        this.segmentTypeList.push({label: 'MMCAngle', value: 'Mixed Match Challenge - Angle'});
        this.segmentTypeList.push({label: 'MMCMatch', value: 'Mixed Match Challenge - Match'});
      }

      this.action = data.action;
      if(data.action == 'edit'){
        this.segment = data.segment
      }
      this.format = data.format;
      this.show = data.show;

    }

  ngOnInit() {
  }

}
