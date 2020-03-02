import { Component, OnInit, Inject } from '@angular/core';
import { Format } from 'src/app/objects/format';
import { GeneralFunctionService } from 'src/app/services/general-function.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'diaryDome-create-format-popup',
  templateUrl: './create-format-popup.component.html',
  styleUrls: ['./create-format-popup.component.scss']
})
export class CreateFormatPopupComponent implements OnInit {

  format: Format = new Format();
  constructor(    
    public GFService: GeneralFunctionService,
    public dialogRef: MatDialogRef<CreateFormatPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
  ) { }

  ngOnInit() {
  }

}
