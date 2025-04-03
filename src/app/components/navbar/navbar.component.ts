import { Component, HostListener, inject, ViewChild } from '@angular/core';
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
  

  @ViewChild('sidenav') sidenav!: MatSidenav;

  @HostListener('window:resize', [])
  onResize() {
    if (window.innerWidth >= 768 && this.sidenav.opened) {
      this.sidenav.close();
    }
  }

  signIn(isSignup = false) {
    const dialogRef = this.dialog.open(LoginComponent, { 
      width: '400px',
      height: '550px',
      panelClass: ['animate__animated', 'animate__fadeInDown']
    });
  
    dialogRef.afterClosed().subscribe(result => {
      //
    });
  }
  

  ngOnInit(): void {
      // this.userService.getMessages().subscribe({
      //   next: (response) => {
      //     alert(response);
     
      //   },
      //   error: (error) => {
      //     console.log("There was an error:" + error);
      //   }
      // });
    
  }
  
  
}


