import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { NgxSpinnerModule } from "ngx-spinner";




@Component({
  selector: 'app-root',
  imports: [NavbarComponent,SidenavComponent,NgxSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

}
