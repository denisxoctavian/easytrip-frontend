import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment.development";
import { CookiesService } from "./cookies.service";
import { Activity } from "../../models/activities";
import { Vacation } from "../../models/vacations";




@Injectable({
    providedIn: 'root'
})
export class VacationService{
    private http = inject(HttpClient);
    private cookiesService = inject(CookiesService);

    
    token = this.cookiesService.getCookie("auth_token");

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`
        })
    };

    constructor(){}

    create(requestBody:any):Observable<any>{
        return this.http.post<any>(environment.API_PATH+'/vacations',requestBody,this.httpOptions);
    }

    get(id: any):Observable<Vacation>{
        return this.http.get<Vacation>(environment.API_PATH+`/vacations/${id}`,this.httpOptions);
    }

    delete(id: any):Observable<any>{
        return this.http.delete<any>(environment.API_PATH+`/vacations/${id}`,this.httpOptions);
    }

  
    
}