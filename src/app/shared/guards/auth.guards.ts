import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../services/auth.service"
import { map, Observable } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { LoginComponent } from "../../features/login/login.component";


@Injectable({
    providedIn: 'root',
  })
  export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router, readonly dialog : MatDialog) {}
  
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      
        if(this.authService.token === ''){
          this.router.navigate(['/home']);
           const dialogRef = this.dialog.open(LoginComponent, { 
                width: '400px',
                height: '550px',
                panelClass: ['animate__animated', 'animate__fadeInDown']
              });
          return false;
        }
           
        return this.authService.checkToken(this.authService.token).pipe(map((isAuthenticated) => {
        if (isAuthenticated) {
          return true;
        } else {
          this.router.navigate(['/home']);
          return false;
        }
      }));
    }
  }

