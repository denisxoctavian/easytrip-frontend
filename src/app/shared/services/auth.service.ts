import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookiesService } from './cookies.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private http = inject(HttpClient);
  private cookiesService = inject(CookiesService);
  
  token = this.cookiesService.getCookie("auth_token");
  
      httpOptions = {
          headers: new HttpHeaders({
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this.token}`
          })
      };

  constructor() {}

  login(body:any){
    return this.http.post<any>(environment.API_PATH+'/auth/login',body);
  }

  register(body:any){
    return this.http.post<any>(environment.API_PATH+'/auth/register',body);
  }

  checkToken(token: any): Observable<boolean> {
    return this.http.post<any>(environment.API_PATH + '/auth/validate-token',token);
  }


}