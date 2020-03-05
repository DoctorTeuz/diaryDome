import { Component, OnInit } from '@angular/core';
import { WorkerService } from '../../services/worker.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  constructor(public workerService: WorkerService) { }

  ngOnInit() {

  }

}
