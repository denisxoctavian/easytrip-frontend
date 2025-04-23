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
import { PropertyService } from '../../shared/services/property.service';
import { HttpHeaders } from '@angular/common/http';
import { Hotel } from '../../models/hotels';
import { MatButtonModule } from '@angular/material/button';
import { NgxSpinner, NgxSpinnerModule,NgxSpinnerService  } from 'ngx-spinner';
import { JsPDFService } from '../../shared/services/jspdf.service';


@Component({
  selector: 'app-trip',
  imports: [MapComponent,MatTabsModule, MatIconModule,MatExpansionModule,MatCardModule,MatButtonModule, NgxSpinnerModule],
  templateUrl: './trip.component.html',
  styleUrl: './trip.component.scss'
})
export class TripComponent {
  private destinationService = inject(DestinationsService);
  private vacationService = inject(VacationService);
  private route = inject(ActivatedRoute);
  private propertyService = inject(PropertyService);
  private spinnerService = inject(NgxSpinnerService);
  private jspdfService = inject(JsPDFService);


  vacation: Vacation ;
  hotels: Hotel[] = [];
  imgSrc = '';
  step = signal(0);
  isDesktop: boolean = true;



  ngOnInit(){
    let lat,lon;
    this.spinnerService.show();

    this.route.paramMap.subscribe(params => {
      this.vacationService.get(params.get('id')).subscribe({
        next: (res)=>{
         this.vacation = res;
         this.propertyService.getRapidKey().subscribe({
          next: (res)=>{
            const options = {
              headers: new HttpHeaders({
                'X-RapidAPI-Key': res.key,
                'X-RapidAPI-Host': 'booking-com15.p.rapidapi.com'
              })
            };
          
            this.destinationService.getDestinationXandY(this.vacation.country).subscribe({
              next: (result)=>{
                if(result.length > 0){
                   lat = +result[0].lat;
                   lon = +result[0].lon;
                
                   this.destinationService.getDestinationBookings(lat,lon,this.vacation.startingDate,this.vacation.endingDate,3,
                    2,10,this.vacation.budget/2,"en-gb","EUR",options).subscribe({
                      next: (res)=>{
                        this.hotels = res.data.result;
                      }
                    })
                    this.destinationService.getDestinationImage().subscribe({
                      next: (res)=>{
                        this.imgSrc= res;
                      },
                    })
                  }
            },
            complete: () =>{
              setTimeout(() => {
                this.spinnerService.hide();
              }, 1500);
            }})
          },
         })
        }
      })
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
    this.jspdfService.generateVacationPDF(this.vacation);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isDesktop = window.innerWidth >= 768;
  }

  encodeHotelName(name: string): string {
    return encodeURIComponent(name);
  }
  
 
  
}
