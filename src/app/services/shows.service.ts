import { Injectable } from '@angular/core';
import { GeneralFunctionService } from './general-function.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ContestGenerateService } from './htmlGenerateService/contest-generate.service';
import { AngleGenerateService } from './htmlGenerateService/angle-generate.service';
import { InfoGenerateService } from './htmlGenerateService/info-generate.service';
import { MatchGenerateService } from './htmlGenerateService/match-generate.service';
import { Segment } from '../objects/segment';

@Injectable({
  providedIn: 'root'
})
export class ShowsService {

  showsPath = environment.apiPath + 'show.php';
  show;
  showDetail: Array<Segment>;
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

  depublishShow(showId){
    const params = {
      userId: this.GFService.user.ID.toString(),
      showId: showId.toString()
    }
    return this.http.post(this.showsPath + '/depublish', params)
    
  }

  deleteSegment(segmentId){
    const params = {
      userId: this.GFService.user.ID.toString(),
      segmentId: segmentId.toString()
    }
    return this.http.post(this.showsPath + '/deleteSegment', params)
  }

  createSegment(segment){
    let config = {
      segment: segment,
    }
    return this.http.post(this.showsPath + '/createNewSegment', config)
  }

  editSegment(segment){
    let config = {
      segment: segment,
    }
    return this.http.post(this.showsPath + '/updateSegment', config)
  }

  mapSegment(segment){
    return segment.map(seg => {
      seg['contentArea'] = this.GFService.clearText(seg['content']);
      seg['matchWorkers'] = seg['matchWorkers'] ? this.GFService.clearText(seg['matchWorkers']) : seg['matchWorkers'];
      seg['matchWorkersView'] = seg['matchWorkers'] ? seg['matchWorkers'].split('|').join(', ') : seg['matchWorkers'];
      seg['champion'] = seg['champion'] ? this.GFService.clearText(seg['champion']) : seg['champion'];
      seg['matchScheme'] = seg['matchScheme'] ? this.GFService.clearText(seg['matchScheme']) : seg['matchScheme'];
      seg['matchWinner'] = seg['matchWinner'] ? this.GFService.clearText(seg['matchWinner']) : seg['matchWinner'];
      seg['championshipAdv'] = seg['championshipAdv'] == 1 || seg['championshipAdv'] == '1';
      seg['titleChange'] = seg['titleChange'] == 1 || seg['titleChange'] == '1';
      return seg;
    });
  }
}
