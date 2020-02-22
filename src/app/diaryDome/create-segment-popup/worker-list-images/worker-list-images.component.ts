import { Component, OnInit, Inject } from '@angular/core';
import { GeneralFunctionService } from 'src/app/services/general-function.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CreateShowPopupComponent } from '../../create-show-popup/create-show-popup.component';

@Component({
  selector: 'diaryDome-worker-list-images',
  templateUrl: './worker-list-images.component.html',
  styleUrls: ['./worker-list-images.component.scss']
})
export class WorkerListImagesComponent implements OnInit {

  parent;

  constructor(
    public GFService: GeneralFunctionService,
    public dialogRef2: MatDialogRef<CreateShowPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    ) {
      this.parent = data.component;
    }

  ngOnInit() {
  }

  isArchived(img){
    return this.parent.archivedImages.filter(image => image === img).length > 0 || img === 'Belts' || img == 'Loghi';
  }

  assignWorker(img){
    let worker = img.split('.')[0];
    worker = worker.split("_").join(" ");
    this.parent.segment.matchWorkers = this.parent.segment.matchWorkers ? 
                                          this.parent.segment.matchWorkers + ", " + worker : worker;
  }

  close(){
    this.dialogRef2.close();
  }
}
