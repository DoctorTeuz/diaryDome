import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlboService {

  alboPath = environment.apiPath + 'albo.php';
  
  constructor(private http : HttpClient) {

  }

  getAlboList(){
    return this.http.get(this.alboPath + '/getAlbo')
  }
}
