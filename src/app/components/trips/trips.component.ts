import { Component, inject } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { UserService } from '../../shared/services/user.service';
import { Vacation } from '../../models/vacations';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-trips',
  imports: [MatCardModule,MatChipsModule, MatButtonModule,MatIconModule],
  templateUrl: './trips.component.html',
  styleUrl: './trips.component.scss'
})
export class TripsComponent {
  private userService = inject(UserService);
  vacations: Vacation[]= [];

  ngOnInit(){
    this.userService.getVacations().subscribe({
      next: (result:any)=>{
        console.log(result);
        this.vacations = result;
      },
      error:(err:any)=>{
        console.log(err);
        this.vacations = [];
      }
    })
  }

  onCardClick(evt: MouseEvent){
    console.log(evt);
  }


   formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }
}
