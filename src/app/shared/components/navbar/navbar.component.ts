import { Component, HostListener, inject } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../../../features/login/login.component';
import { UserService } from '../../services/user.service';





@Component({
  selector: 'app-navbar',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule,MatSidenavModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  
  readonly dialog = inject(MatDialog);
  private userService = inject(UserService);


  //Open login dialog
  openDialog(){
      this.dialog.open(LoginComponent, {width:'500px',height:'300px',panelClass: ['animate__animated','animate__fadeInDown']},)
    }

  ngOnInit(): void {
    this.userService.getUserInfo().subscribe((data) => {
      if (data.authenticated) {
        console.log(data);
      }
    });
  }

}

