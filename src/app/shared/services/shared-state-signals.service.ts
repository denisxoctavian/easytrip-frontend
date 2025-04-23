// shared-state.service.ts
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SharedStateService {

  private destinationCountrySignal = signal<string>('');
  destinationCountry = this.destinationCountrySignal.asReadonly();

  setDestinationCountry(id: string) {
    this.destinationCountrySignal.set(id);
  }
}