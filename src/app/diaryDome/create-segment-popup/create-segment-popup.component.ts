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
    {value: 'Angle', label: 'Angle'},
    {value: 'Match', label: 'Match'},
    {value: 'SpecialMatch', label: 'Special Match'},
    {value: 'ShortMatch', label: 'Recap Breve di un incontro'},
    {value: 'Info', label: 'Infografica'},
    {value: 'Hype', label: 'Infografica promozionale'},
    {value: 'Plain', label: 'Senza Grafica'},
  ];

  placementList = [
    {value: 'PreShow', label: 'Pre-Show o Kickoff'},
    {value: 'Show', label: 'Show'},
    {value: 'PostShow', label: 'Post Show o Dark Show'},
  ];

  hintImages = "Il contenuto di questo box serve per <b>generare</b> la sezione delle immagini. Ogni lottatore dovrà essere identificato con il nome dell'immagine che lo rappresenta." + 
                "<br>Da dividere con la virgole" + 
                "Ove necessario indicare il tag di VS è necessario scrivere <b><font color=red>VVSS</font></b> come se fosse un Worker.";

  constructor(
    public GFService: GeneralFunctionService,
    public dialogRef: MatDialogRef<CreateShowPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    public showService: ShowsService,
    ) {
      if(this.GFService.user.ID == 1){
        this.segmentTypeList.push({value: 'MMCAngle', label: 'Mixed Match Challenge - Angle'});
        this.segmentTypeList.push({value: 'MMCMatch', label: 'Mixed Match Challenge - Match'});
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
