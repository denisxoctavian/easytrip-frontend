import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment.development";
import { CookiesService } from "./cookies.service";




@Injectable({
    providedIn: 'root'
})
export class UserService{
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

    getMessages():Observable<any>{
        return this.http.get<any>(environment.API_PATH+'/messages',this.httpOptions);
    }


    
}