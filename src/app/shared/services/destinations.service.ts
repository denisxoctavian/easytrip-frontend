import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable, of, shareReplay, tap } from 'rxjs';
import { StorageService } from './storage.service';
import { Destination } from '../../models/destinations';
;

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
