import { Component, OnInit } from '@angular/core';
import { WorkerService } from 'src/app/services/worker.service';
import { environment } from 'src/environments/environment'
import { GeneralFunctionService } from 'src/app/services/general-function.service';
import { MatDialog } from '@angular/material';
import { brandCheckObj } from './brand-check.config';
import { WorkerInformationComponent } from './worker-information/worker-information.component';



@Component({
  selector: 'diaryDome-worker-complete-list',
  templateUrl: './worker-complete-list.component.html',
  styleUrls: ['./worker-complete-list.component.scss']
})


export class WorkerCompleteListComponent implements OnInit {

  pickedBrand = 'RAW';
  imgArray = ['RAW', 'SD', 'Glow_Again', 'Rainbow_Dash', 'NXT', 'NXTPC', 'NXTEU'];
  workerList;
  filteredWorkerList;

  constructor(  
    public workerService: WorkerService,
    public GFService: GeneralFunctionService,
    public dialog: MatDialog,
    ) { }

  ngOnInit() {
    this.GFService.countThread(true);
    this.workerService.getWorkerList().subscribe(
      (res: any) => {
        this.GFService.countThread(false);
        if(res){
          this.workerList = res.body.workers;
          console.log(this.workerList)
          this.filterList();
        }
    });
    this.GFService.getTeuzLastShowDateAction();
    
  }

  pickBrand(img){
    this.pickedBrand = img;
    this.filterList();
  }

  filterList(){
    this.filteredWorkerList = this.workerList.filter(worker => {
      const chosenBrand = brandCheckObj[this.pickedBrand];
      return (chosenBrand.okBrand.filter(brand => {return worker.Brand == brand}).length > 0 || 
              chosenBrand.okDivision.filter(div => {return worker.Division == div}).length > 0) &&
              chosenBrand.koBrand.filter(brand => {return worker.Brand == brand}).length == 0 &&
              chosenBrand.koDivision.filter(div => {return worker.Division == div}).length== 0;
      })
  }

  isBrand(worker){
    const chosenBrand = brandCheckObj[this.pickedBrand];
    return (chosenBrand.okBrand.filter(brand => {return worker.Brand == brand}).length > 0 || 
            chosenBrand.okDivision.filter(div => {return worker.Division == div}).length > 0) &&
            chosenBrand.koBrand.filter(brand => {return worker.Brand == brand}).length == 0 &&
            chosenBrand.koDivision.filter(div => {return worker.Division == div}).length== 0;
  }
  
  openWorkerInformation(worker){
    this.GFService.countThread(true);
    this.workerService.getSingleWorker(worker.ID).subscribe(
      (res: any) => {
        this.GFService.countThread(false);
        let config = {
          worker: res.body.worker,
          component: this,
        };
        let dialogRef  = this.dialog.open(WorkerInformationComponent, {
          maxHeight: '500px',
          width: '800px',
          data: config
        })
      }
    );

  }
}
