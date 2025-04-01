import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private loginUrl =  environment.API_PATH + '/oauth2/authorization/github';
  private logoutUrl = environment.API_PATH + '/logout';

  constructor() {}


  login(): void {
    window.location.href = this.loginUrl;
  }


  logout(): void {
    window.location.href = this.logoutUrl;
  }
}