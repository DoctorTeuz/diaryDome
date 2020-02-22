import { Component, OnInit, Inject } from '@angular/core';
import { GeneralFunctionService } from 'src/app/services/general-function.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { CreateShowPopupComponent } from '../create-show-popup/create-show-popup.component';
import { ShowsService } from 'src/app/services/shows.service';
import { Segment } from 'src/app/objects/segment';
import { WorkerService } from 'src/app/services/worker.service';
import { WorkerListImagesComponent } from './worker-list-images/worker-list-images.component';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'true-create-segment-popup',
  templateUrl: './create-segment-popup.component.html',
  styleUrls: ['./create-segment-popup.component.scss']
})
export class CreateSegmentPopupComponent implements OnInit {
  
  segment = new Segment();
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
  archivedImages: Array<string>;

  hintImages = "Il contenuto di questo box serve per <b>generare</b> la sezione delle immagini. Ogni lottatore dovrà essere identificato con il nome dell'immagine che lo rappresenta." + 
                "<br>Da dividere con la virgole" + 
                "Ove necessario indicare il tag di VS è necessario scrivere <b><font color=red>VVSS</font></b> come se fosse un Worker.";

  parent;



  constructor(
    public GFService: GeneralFunctionService,
    public dialogRef: MatDialogRef<CreateShowPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    public showService: ShowsService,
    public workerService: WorkerService,
    public dialog: MatDialog,
    ) {
      if(this.GFService.user.ID == 1){
        this.segmentTypeList.push({value: 'MMCAngle', label: 'Mixed Match Challenge - Angle'});
        this.segmentTypeList.push({value: 'MMCMatch', label: 'Mixed Match Challenge - Match'});
      }
      this.parent = data.component;
      this.action = data.action;
      if(data.action == 'edit'){
        this.segment = data.segment;
      }
      this.format = data.format;
      this.show = data.show;

    }

  ngOnInit() {
    this.GFService.countThread(true);
    this.workerService.getImageArchivedNames().subscribe(
      (res : any) => {
        this.archivedImages = res.body.archivedImages
        this.GFService.countThread(false);
      }
    )
  }

  checkConfirm(){
    if(!this.segment.segmentType || !this.segment.placement || !this.segment.title){
      return true;
    }
    if((this.segment.segmentType === 'Match' 
      || this.segment.segmentType === 'SpecialMatch' 
      || this.segment.segmentType === 'ShortMatch'
      || this.segment.segmentType === 'MMCMatch') && 
      (!this.segment.matchScheme || !this.segment.matchType)){
      return true;
    }
    if((this.segment.segmentType === 'SpecialMatch' || this.segment.segmentType === 'Hype') && 
        !this.segment.graphicColor){
      return true;
    }
    return false;
  }

  isLong(){
    if(this.segment.segmentType === 'ShortMatch'){
      return false;
    }
    return true;
  }

  isColorChange(){
    if(this.segment.segmentType === 'SpecialMatch' || this.segment.segmentType === 'Hype'){
      return true;
    }
    return false;
  }

  isMatch(){
    if(this.segment.segmentType === 'Match' 
      || this.segment.segmentType === 'SpecialMatch' 
      || this.segment.segmentType === 'ShortMatch'
      || this.segment.segmentType === 'MMCMatch'){
      return true;
    }
    return false;
  }

  isChampionship(){
    if(!this.isMatch() || !this.segment.championship){
      return false;
    }
    return true;
  }

  openWorkerSelection(){
    const config = {
      component: this,
    };
    this.dialog.open(WorkerListImagesComponent, {
      width: '700px',
      data: config
    })
  }

  actionDispatcher(){
    if(this.action == 'create'){
      this.GFService.countThread(true);
      try {
        this.showService.createSegment(this.segment).pipe(
          switchMap((res:any) => {
            return this.showService.getShowDetail(this.showService.show.ID)
          })
        ).subscribe(
          (res: any) => {
            this.GFService.countThread(false);
            this.showService.showDetail = res.body.showDetail;
            this.parent.ngOnInit();
          }
        )
      } catch (error) {
        this.GFService.countThread(false);
        console.log(error)
      }
      
    }
    else{
      this.parent.generateHTML(this.segment, true)
    }
  }
}
