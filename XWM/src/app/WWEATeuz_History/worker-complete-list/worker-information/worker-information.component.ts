import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GeneralFunctionService } from 'src/app/services/general-function.service';

@Component({
  selector: 'diaryDome-worker-information',
  templateUrl: './worker-information.component.html',
  styleUrls: ['./worker-information.component.scss']
})
export class WorkerInformationComponent implements OnInit {

  worker;
  currentTitles;
  component;

  constructor(
    public dialogRef: MatDialogRef<WorkerInformationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    public GFService: GeneralFunctionService, 
  ) {
    this.worker = data.worker;
    this.component = data.component;
  }

  ngOnInit() {
    this.currentTitles = this.worker.Albo.filter(title => {
      return title.Current
    })
  }

  currentlyHolding(){
    let str = "";
    let i = 0;
    let obj = this.currentTitles.map(title => {
      str = str + (i>0 ? ', ' : '') + title.Title
      i++;
    });
    return "Current " + str + " Champion";
  }
}
