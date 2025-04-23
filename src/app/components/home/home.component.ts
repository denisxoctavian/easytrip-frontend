import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [MatButtonModule,MatExpansionModule ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  private router = inject(Router);

  actionButtonClicked(){
    this.router.navigate(['/trip-planner'])
  }
}
