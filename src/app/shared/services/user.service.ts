import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment.development";


const httpOptions = {
    headers: new HttpHeaders({
        'Accept': 'application/json',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
        'Content-Type': 'application/json'
    })
};



@Injectable({
    providedIn: 'root'
})
export class UserService{
    private http = inject(HttpClient);

    constructor(){}

    getUserInfo(): Observable<any> {
        return this.http.get<any>(environment.API_PATH + '/user', {
            withCredentials: true
        });
    }

    debug(): Observable<any> {
        return this.http.get<any>(environment.API_PATH + '/wakeup', {

        });
    }
    
}