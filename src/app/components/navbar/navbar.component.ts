import { Component, HostListener, inject, Input, ViewChild } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from './../../features/login/login.component';
import { UserService } from '../../shared/services/user.service';
import { AuthService } from '../../shared/services/auth.service';
import {MatMenuModule} from '@angular/material/menu'
import { CookiesService } from '../../shared/services/cookies.service';
import { Router } from '@angular/router';
import { SidenavComponent } from '../sidenav/sidenav.component';






@Component({
  selector: 'app-navbar',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule,MatSidenavModule,MatMenuModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  
  readonly dialog = inject(MatDialog);
  public userLogged = false;
  public avatarUrl: string = '';
  private cookiesService=inject(CookiesService);
  private readonly router = inject(Router);
  

  @Input() sidenavc!: SidenavComponent;


  @HostListener('window:resize', [])
  onResize() {
    if (window.innerWidth < 768) {
      window.scrollTo(0, 0); 
    }
    if (window.innerWidth >= 768 && this.sidenavc.opened()) {
      this.sidenavc.close();
    }
  }

  signIn() {
    const dialogRef = this.dialog.open(LoginComponent, { 
      width: '400px',
      height: '550px',
      panelClass: ['animate__animated', 'animate__fadeInDown']
    });
  
    dialogRef.afterClosed().subscribe(result => {
      window.location.reload();
    });
  }

  signOut() {
    this.router.navigate(['/home']);
    this.cookiesService.deleteCookie('auth_token');
    window.location.reload();
  }
  
  ngOnInit(): void {
      if(this.cookiesService.getCookie('auth_token') !== '')
        this.userLogged = true;
    
  }

  tripPlannerClicked(){
    this.router.navigate(['/trip-planner'])
  }

  aboutClicked(){
    this.router.navigate(['/about'])
  }

  dealsClicked(){
    this.router.navigate(['/deals'])
  }

  homeClicked(){
    this.router.navigate(['/home']);
  }

  tripsClicked(){
    this.router.navigate(['/trips']);
  }


 toggleSidenav() {
  this.sidenavc.toggle();
  }

  
}


