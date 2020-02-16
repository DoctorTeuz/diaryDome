import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { GeneralFunctionService } from 'src/app/services/general-function.service';

@Component({
  selector: 'diaryDome-generic-alert-popup',
  templateUrl: './generic-alert-popup.component.html',
  styleUrls: ['./generic-alert-popup.component.scss']
})
export class GenericAlertPopupComponent implements OnInit {
    component;
    function;
    message: string;
    header: string;
    level;
    callbackParams;
  constructor(
    public GFService: GeneralFunctionService,
    public dialogRef: MatDialogRef<GenericAlertPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
  ){
    this.component = data.component;
    this.function = data.function;
    this.message = data.message;
    this.header = data.header;
    this.level = data.level;
    this.callbackParams = data.callbackParams;
  }

  ngOnInit() {
  }

  confirm(){
    this.component[this.function](this.callbackParams);
    this.close();
  }

  close(){
    this.dialogRef.close()
  }
}
