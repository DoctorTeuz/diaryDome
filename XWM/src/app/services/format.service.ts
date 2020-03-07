import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GeneralFunctionService } from './general-function.service';
import { HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import { RequestOptions} from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class FormatService {

  formatsPath = environment.apiPath + 'format.php';
  
  constructor(
    public GFService: GeneralFunctionService,
    private http : HttpClient
  ) { }

  getFormats(ID){
    const params = new HttpParams().set('userId', ID);
    return this.http.get(this.formatsPath + '/getFormatList', {params: params})
  }


  activateFormat(formatId){
    const params = {
      userId: this.GFService.user.ID.toString(),
      formatId: formatId.toString()
    }
    return this.http.post(this.formatsPath + '/active', params)
  }

  deactivateFormat(formatId){
    const params = {
      userId: this.GFService.user.ID.toString(),
      formatId: formatId.toString()
    }
    return this.http.post(this.formatsPath + '/deactive', params)
  }

  createFormat(format){
/*     let options = { headers: header }; */
    const params = {
      userId: this.GFService.user.ID.toString(),
      format: format
    }
  
    return this.http.post(this.formatsPath + '/createFormat', params);
  }

  uploadLogo(formData){
    
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    /* headers.append('Accept', 'application/json'); */
    let options = { headers: headers }
    return this.http.post(this.formatsPath + '/uploadLogo', formData, options);
  }
}
