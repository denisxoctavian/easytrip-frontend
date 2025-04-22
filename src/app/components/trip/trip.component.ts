import { Component, HostListener, inject, signal } from '@angular/core';
import { MapComponent } from '../../shared/components/map/map.component';
import { DestinationsService } from '../../shared/services/destinations.service';
import {MatTabsModule} from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { VacationService } from '../../shared/services/vacation.service';
import { ActivatedRoute } from '@angular/router';
import { Vacation } from '../../models/vacations';

@Component({
  selector: 'app-trip',
  imports: [MapComponent,MatTabsModule, MatIconModule,MatExpansionModule,MatCardModule],
  templateUrl: './trip.component.html',
  styleUrl: './trip.component.scss'
})
export class TripComponent {
  private destinationService = inject(DestinationsService);
  private vacationService = inject(VacationService);
  private route = inject(ActivatedRoute);

  vacation: Vacation ;
  imgSrc = '';
  step = signal(0);
  isDesktop: boolean = true;

  ngOnInit(){
    this.route.paramMap.subscribe(params => {
      this.vacationService.get(params.get('id')).subscribe({
        next: (res)=>{
         this.vacation = res;
         
        }
      })
    })

    this.destinationService.getDestinationImage('Romania').subscribe({
      next: (res)=>{
        this.imgSrc= res;
      }
    })
  }

  setStep(index: number) {
    this.step.set(index);
  }


  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }
  
  savePDF(){
    console.log("save PDF");
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isDesktop = window.innerWidth >= 768;
  }
 
  
}
