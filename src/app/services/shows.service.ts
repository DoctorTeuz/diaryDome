import { Injectable } from '@angular/core';
import { GeneralFunctionService } from './general-function.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShowsService {

  showsPath = environment.apiPath + 'show.php';
  show;
  showDetail;
  usedFormat;

  constructor(
    public GFService: GeneralFunctionService,
    private http : HttpClient
  ) {
   }

  getShowList(){
    const params = new HttpParams().set('userId', this.GFService.user.ID.toString());
    return this.http.get(this.showsPath + '/getShowList', {params: params})
  }

  createShow(show){
    return this.http.post(this.showsPath + '/createNewShow', show);
  }

  updateShow(show){
    return this.http.put(this.showsPath + '/updateShow', show);
  }

  deleteShow(showId){
    const params = {
      userId: this.GFService.user.ID.toString(),
      showId: showId.toString()
    }
    
    return this.http.post(this.showsPath + '/deleteShow', params)
  }

  getShowDetail(showId){
    const params = {
      userId: this.GFService.user.ID.toString(),
      showId: showId.toString()
    }
    return this.http.post(this.showsPath + '/getDetail', params)
  }
}
