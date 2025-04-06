import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private http = inject(HttpClient);

  constructor() {}

  login(body:any){
    return this.http.post<any>(environment.API_PATH+'/login',body);
  }

  register(body:any){
    return this.http.post<any>(environment.API_PATH+'/register',body);
  }


}