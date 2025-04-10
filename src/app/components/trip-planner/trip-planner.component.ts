import { Component, inject, OnInit } from '@angular/core';
import { DestinationsService } from '../../shared/services/destinations.service';
import { CookiesService } from '../../shared/services/cookies.service';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-trip-planner',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './trip-planner.component.html',
  styleUrl: './trip-planner.component.scss'
})
export class TripPlannerComponent implements OnInit {

  private destinationService = inject(DestinationsService);


  destinations: any[] = [];

  ngOnInit() {
    this.destinationService.getDestinationsByRegion().subscribe({
      next: (result) => {
        this.destinations = result;
        console.log(result);
      },
      error: (err) => {
        console.error("Error fetching destinations:", err);
      }
    });
  }
}
