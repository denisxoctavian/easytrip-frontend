import { inject, Injectable } from "@angular/core";
import { CookieService } from 'ngx-cookie-service';


@Injectable({
    providedIn: 'root'
})
export class CookiesService{
    private cookieService = inject(CookieService)

    setCookie(name:any,value:any){
        this.cookieService.set(name,value);
    }

    getCookie(name:any){
        return this.cookieService.get(name);
    }

    deleteCookie(name:any){
        this.cookieService.delete(name);
    }

    deleteAll(){
        this.cookieService.deleteAll();
    }

}