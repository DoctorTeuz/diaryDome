import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { GeneralFunctionService } from '../../services/general-function.service';
import { MenuComponent } from '../menu/menu.component';
import { switchMap } from 'rxjs/operators';
import { FormatService } from 'src/app/services/format.service';
import { from } from 'rxjs';

@Component({
  selector: 'diaryDome-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username;
  password;
  passwordCheck;
  dateType;
  errorMessage;
  kind = 'L';

  softwares= [
    {label: 'EWR', name: 'Extreme Warfare Revenge'},
    {label: 'TEW', name: 'Total Extreme Wrestling'},
  ]
  constructor(
    public GFService: GeneralFunctionService,
    public menu: MenuComponent,
    public loginService: LoginService,
    public formatService: FormatService,
    ) { }

  ngOnInit() {
    this.loginService.logout();
  }

  actionDispatcher(){
    if(this.kind == 'L'){
      this.errorMessage = null;
      this.login(this.username, this.password, this);
    }
    else if(this.kind == 'R'){
      this.errorMessage = null;
      if(this.password != this.passwordCheck){
        this.errorMessage = 'La Password e la Password di controllo sono diverse';
      }
      this.register(this.username, this.password, this.dateType, this)
      //registrazione
    }
  }

  setError(err){
    this.errorMessage = err;
  }

  doRegister(){
    this.kind = 'R';
  }

  login(username, password, component){
    this.GFService.countThread(true);
    let userData;
    this.loginService.login(username, password).pipe(
      switchMap((res: any) => {
        if(res.error){
          component.setError(res.error);
        }
        else{
          userData = res.body.user
          return this.formatService.getFormats(userData.ID)
        }
        return from('N');
      })
    ).subscribe(
      (res: any) => {
        userData['formats'] = res.body.formats;
        console.log(userData['formats']);
        this.GFService.countThread(false);
        this.GFService.setUser(userData);
        this.GFService.filterMenu('login');
        this.GFService.navigateTo('/Homepage');
      }
    )
  }

  register(username, password, dateType, component){
   /*  this.GFService.countThread(true); */
    this.loginService.register(username, password, dateType).subscribe(
      (res: any) => {
        /* this.GFService.countThread(false); */
        if(res.error){
          component.setError(res.error);
        }
        else{
          this.GFService.navigateTo('/Homepage');
          this.GFService.filterMenu('login');
        }
      })    
  }
}
