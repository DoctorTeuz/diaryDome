import { Component, OnInit, Inject } from '@angular/core';
import { GeneralFunctionService } from 'src/app/services/general-function.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { CreateShowPopupComponent } from '../create-show-popup/create-show-popup.component';
import { ShowsService } from 'src/app/services/shows.service';
import { Segment } from 'src/app/objects/segment';
import { WorkerService } from 'src/app/services/worker.service';
import { WorkerListImagesComponent } from './worker-list-images/worker-list-images.component';
import { switchMap } from 'rxjs/operators';
import { ToolbarService, LinkService, ImageService, HtmlEditorService, MarkdownEditorService } from '@syncfusion/ej2-angular-richtexteditor';

@Component({
  selector: 'true-create-segment-popup',
  templateUrl: './create-segment-popup.component.html',
  styleUrls: ['./create-segment-popup.component.scss'],
  providers: [ToolbarService, LinkService, ImageService, HtmlEditorService, MarkdownEditorService]
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

  //TEXTAREA DATA
  public tools: object = {
    items: ['Undo', 'Redo', '|',
        'Bold', 'Italic', 'Underline', 'StrikeThrough', '|',
         'FontColor', 'Image', '|', 'SourceCode', '|', 'Alignments', '|', 'OrderedList', 'UnorderedList']
};
public iframe: object = { enable: false };
public height: number = 300;


  constructor(
    public GFService: GeneralFunctionService,
    public dialogRef: MatDialogRef<CreateShowPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    public showService: ShowsService,
    public workerService: WorkerService,
    public dialog: MatDialog,
    ) {
      
      dialogRef.disableClose = true;
      if(this.GFService.user.ID == 1){
        this.segmentTypeList.push({value: 'MMCAngle', label: 'Mixed Match Challenge - Angle'});
        this.segmentTypeList.push({value: 'MMCMatch', label: 'Mixed Match Challenge - Match'});
      }
      this.parent = data.component;
      this.action = data.action;
      if(data.action == 'edit'){
        this.segment = data.segment;
      }
      else{
        this.segment.showId = this.showService.show.ID;
        this.segment.contentArea = "";
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
      this.createSegment();
      
    }
    else{
      this.editSegment();
    }
  }

  createSegment(){
    let segment = this.createReq();
    this.GFService.countThread(true);
    try {
      this.showService.createSegment(segment).pipe(
        switchMap((res:any) => {
          return this.showService.getShowDetail(this.showService.show.ID)
        })
      ).subscribe(
        (res: any) => {
          this.GFService.countThread(false);
          let detail = this.showService.mapSegment(res.body.showDetail);         
          this.showService.showDetail = detail;
          this.parent.ngOnInit();
          this.close();
        }
      )
    } catch (error) {
      this.GFService.countThread(false);
      console.log(error)
    }
  }

  editSegment(){
    let segment = this.createReq();
    this.GFService.countThread(true);
    try {
      this.showService.editSegment(segment).pipe(
        switchMap((res:any) => {
          return this.showService.getShowDetail(this.showService.show.ID)
        })
      ).subscribe(
        (res: any) => {
          this.GFService.countThread(false);
          let detail = this.showService.mapSegment(res.body.showDetail);         
          this.showService.showDetail = detail;
          this.parent.ngOnInit();
          this.close();
        }
      )
    } catch (error) {
      this.GFService.countThread(false);
      console.log(error)
    }
  }

  createReq(){
    let seg = this.segment;
    seg['content'] = seg['contentArea'] ? this.GFService.richText(seg['contentArea']) : seg['contentArea'];
    seg['matchWorkers'] = seg['matchWorkersView'] ? this.GFService.richText(seg['matchWorkersView']) : seg['matchWorkersView'];
    seg['matchWorkers'] = seg['matchWorkers'] ? seg['matchWorkers'].split(', ').join('|') : seg['matchWorkers'];
    seg['matchWorkers'] = seg['matchWorkers'] ? seg['matchWorkers'].split(',').join('|') : seg['matchWorkers'];
    seg['champion'] = seg['champion'] ? this.GFService.richText(seg['champion']) : seg['champion'];
    seg['matchScheme'] = seg['matchScheme'] ? this.GFService.richText(seg['matchScheme']) : seg['matchScheme'];
    seg['matchWinner'] = seg['matchWinner'] ? this.GFService.richText(seg['matchWinner']) : seg['matchWinner'];
    seg['userId'] = this.GFService.user.ID;
    seg['championshipAdv'] = seg['championshipAdv'] ? 1 : 0;
    seg['titleChange'] = seg['titleChange'] ? 1 : 0;
    seg['orderAppear'] = seg['orderAppear'] ? seg['orderAppear'] : this.showService.showDetail.length + 1;
    seg['shownTitle'] = seg['shownTitle'] ? this.GFService.richText(seg['shownTitle']) : seg['shownTitle'];
    return seg;
  }

  setTitle(){
    if(!this.segment['title']){
      this.segment['title'] = this.segment.matchScheme;
    }
  }

  close(){
    this.dialogRef.close();
  }
}
