import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpClient,
  HttpParams
} from '@angular/common/http';
import { GeneralFunctionService } from './general-function.service';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {

  workerPath = environment.apiPath + 'worker.php';

  constructor(
    private http : HttpClient,
    public GFService: GeneralFunctionService,
    ) { }

  getWorkerList(){
    return this.http.get(this.workerPath + '/getWorkers')
  }

  getSingleWorker(id){
    const params = new HttpParams().set('workerId', id.toString());
    return this.http.get(this.workerPath + '/getSingleWorker', { params: params })
  }

  getImageArchivedNames(){
    const params = {
      userId: this.GFService.user.ID.toString(),
    }
    return this.http.post(this.workerPath + '/getAlumni', params);
    
  }
}
