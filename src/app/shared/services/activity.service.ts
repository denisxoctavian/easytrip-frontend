import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment.development";
import { CookiesService } from "./cookies.service";
import { Activity } from "../../models/activities";




@Injectable({
    providedIn: 'root'
})
export class ActivityService{
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

    getActivities(): Observable<Activity[]> {
        return this.http.get<any>(environment.API_PATH+'/activities',this.httpOptions);
    }


    
}