import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { GeneralFunctionService } from './general-function.service';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  
  loginPath = environment.apiPath + 'login.php';

  constructor(
    private http : HttpClient,
    public GFService: GeneralFunctionService,
    ) { 
    }

  logout(){
    this.GFService.user.clearUser();
    localStorage.removeItem('user');
    this.GFService.navigateTo('/login')
  }

  login(user, pass){
    let params = {
      username: user,
      password: pass
    }
    return this.http.post(this.loginPath + '/login', params);
  }

  register(user, pass, DT){
    let params = {
      username: user,
      password: pass,
      datetype: DT
    }
    return this.http.post(this.loginPath + '/register', params);
  }



}

