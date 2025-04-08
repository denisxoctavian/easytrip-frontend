import { Component, HostListener, inject, Input, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { LoginComponent } from '../../features/login/login.component';
import { MatDialog } from '@angular/material/dialog';
import { CookiesService } from '../../shared/services/cookies.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  imports: [MatButtonModule, MatIconModule,MatSidenavModule,MatMenuModule,RouterModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;

readonly dialog = inject(MatDialog);
  public userLogged = false;
  public avatarUrl: string = '';
  private cookiesService=inject(CookiesService);
  private readonly router = inject(Router);
  

  @HostListener('window:resize', [])
  onResize() {
    if (window.innerWidth < 768) {
      window.scrollTo(0, 0); 
    }
    if (window.innerWidth >= 768 && this.sidenav.opened) {
      this.sidenav.close();
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
    this.router.navigate(['/']);
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

  blogClicked(){
    this.router.navigate(['/blog'])
  }

  dealsClicked(){
    this.router.navigate(['/deals'])
  }

  open(){
    this.sidenav.open();
  }
  
  close(){
    this.sidenav.close();
  }
  

  toggle(){
    this.sidenav.toggle();
  }

  opened(){
    return this.sidenav.opened;
  }
  

}
