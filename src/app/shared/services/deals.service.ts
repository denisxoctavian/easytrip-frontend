import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment.development";
import { CookiesService } from "./cookies.service";
import { Deal } from "../../models/deals";




@Injectable({
    providedIn: 'root'
})
export class DealService{
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

    getDeals(): Observable<Deal[]> {
        return this.http.get<any>(environment.API_PATH+'/deals/active',this.httpOptions);
    }


    
}