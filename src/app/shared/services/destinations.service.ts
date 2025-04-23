import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable, of, shareReplay, tap } from 'rxjs';
import { StorageService } from './storage.service';
import { Destination } from '../../models/destinations';
import { PropertyService } from './property.service';
import { HotelApiResponse } from '../../models/hotels';



@Injectable({
  providedIn: 'root',
})
export class DestinationsService {

  private http = inject(HttpClient);
  private storage = inject(StorageService);


  constructor() {}

  getDestinationsByRegion(): Observable<Destination[]> {
    const cachedData = this.storage.load('destinationsCache');
    
    if (cachedData) {
      return of(cachedData);  
    } else {
      return this.http.get<any[]>(`${environment.DESTINATIONS_API_PATH}/region/europe`).pipe(
        shareReplay(1),
        tap((result) => {
          const simplifiedData = this.extractRelevantFields(result);
          this.storage.save('destinationsCache', simplifiedData);
        })
      );
    }
  }

  getDestinationXandY(destination: any){
    return this.http.get<any>(`https://nominatim.openstreetmap.org/search?country=${destination}&format=json`);
  }

  getDestinationImage(){
    return this.http.get<any>(`https://picsum.photos/seed/picsum/600/600`);
  }

  getDestinationBookings(
    latitude: number,
    longitude: number,
    arrival_date: string,
    departure_date: string,
    adults: number,
    rooms: number,
    price_min: number,
    price_max: number,
    languagecode: string,
    currency_code: string,
    options: any
  ): Observable<any> {
    const url = `https://booking-com15.p.rapidapi.com/api/v1/hotels/searchHotelsByCoordinates?latitude=${latitude}
    &longitude=${longitude}&adults=${adults}&radius=400&room_qty=${rooms}
    &languagecode=${languagecode}&currency_code=${currency_code}&arrival_date=${arrival_date}&departure_date=${departure_date}
    &price_min=${price_min}&price_max=${price_max}`;
  
    return this.http.get<HotelApiResponse>(url, options);
  }
  
  

  
  private extractRelevantFields(destinations: any[]): Destination[] {
    return destinations.map(destination => ({
      nameCommon: destination.name?.common || '',
      currencyName: destination.currencies ? destination.currencies[Object.keys(destination.currencies)[0]]?.name : null,
      currencySymbol: destination.currencies ? destination.currencies[Object.keys(destination.currencies)[0]]?.symbol : null,
      capital: destination.capital ? destination.capital[0] : null,
      flag: destination.flag || '',
      flagsPng: destination.flags ? destination.flags.png : null
    }));
  }
}
