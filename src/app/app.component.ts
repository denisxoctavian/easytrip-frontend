import { Component, ViewEncapsulation } from '@angular/core';
import { NavbarComponent } from "./shared/components/navbar/navbar.component";




@Component({
  selector: 'app-root',
  imports: [NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {


}
