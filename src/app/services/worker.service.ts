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

@Injectable({
  providedIn: 'root'
})
export class WorkerService {

  workerPath = environment.apiPath + 'worker.php';

  constructor(private http : HttpClient) { }

  getWorkerList(){
    return this.http.get(this.workerPath + '/getWorkers')
  }

  getSingleWorker(id){
    const params = new HttpParams().set('workerId', id.toString());
    return this.http.get(this.workerPath + '/getSingleWorker', { params: params })
  }
}
