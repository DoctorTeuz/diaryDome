import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
  
export class User{
    ID: number;
    Username: string;
    dateFormat: string;
    userType: string;
    formats: Array<any>;
  
    clearUser(){
      this.ID = null;
      this.Username = null;
      this.dateFormat = null;
      this.userType = null;
      this.formats = [];
    }
  
    setUser(user){
      this.ID = user.ID;
      this.Username = user.Username;
      this.dateFormat = user.dateFormat;
      this.userType = user.userType;
      this.formats = user.formats;
    }
  }