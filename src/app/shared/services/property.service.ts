import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment.development";
import { CookiesService } from "./cookies.service";
import { Vacation } from "../../models/vacations";




@Injectable({
    providedIn: 'root'
})
export class PropertyService{
    
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

    getMapKey():Observable<any>{
        return this.http.get<any>(environment.API_PATH+'/properties/map/key',this.httpOptions);
    }

    getRapidKey():Observable<any>{
        return this.http.get<any>(environment.API_PATH+'/properties/rapid/key',this.httpOptions);
    }

   
}