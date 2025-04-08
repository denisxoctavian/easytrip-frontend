import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { SidenavComponent } from './components/sidenav/sidenav.component';




@Component({
  selector: 'app-root',
  imports: [NavbarComponent,SidenavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

}
