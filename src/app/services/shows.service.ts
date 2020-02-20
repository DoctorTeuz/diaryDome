import { Injectable } from '@angular/core';
import { GeneralFunctionService } from './general-function.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ContestGenerateService } from './htmlGenerateService/contest-generate.service';
import { AngleGenerateService } from './htmlGenerateService/angle-generate.service';
import { InfoGenerateService } from './htmlGenerateService/info-generate.service';
import { MatchGenerateService } from './htmlGenerateService/match-generate.service';

@Injectable({
  providedIn: 'root'
})
export class ShowsService {

  showsPath = environment.apiPath + 'show.php';
  show;
  showDetail;
  usedFormat;
  completeShowString = [];

  constructor(
    public GFService: GeneralFunctionService,
    private http : HttpClient,
    public contestGenerator: ContestGenerateService,
    public angleGenerator: AngleGenerateService,
    public infoGenerator: InfoGenerateService,
    public matchGenerator: MatchGenerateService,
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

  publishShow(showId){
    const params = {
      userId: this.GFService.user.ID.toString(),
      showId: showId.toString()
    }
    return this.http.post(this.showsPath + '/publish', params)
    
  }

}
