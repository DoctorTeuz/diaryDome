import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'diaryDome-popup-top-bar',
  templateUrl: './popup-top-bar.component.html',
  styleUrls: ['./popup-top-bar.component.scss']
})
export class PopupTopBarComponent implements OnInit {

  @Input() title;
  @Input() dialogRef;
  
  constructor() { }

  ngOnInit() {
    
  }

  close(){
    this.dialogRef.close()
  }

}
