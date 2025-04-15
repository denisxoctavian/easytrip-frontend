import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { DestinationsService } from '../../shared/services/destinations.service'; ;
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatChipsModule} from '@angular/material/chips';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { debounceTime, distinctUntilChanged, map, Observable, startWith } from 'rxjs';
import { Destination } from '../../models/destinations';
import {AsyncPipe} from '@angular/common';






@Component({
  selector: 'app-trip-planner',
  standalone: true,
  imports: [ FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    MatChipsModule,
    MatCheckboxModule,
    MatButtonModule,
    MatAutocompleteModule,
    AsyncPipe],
  templateUrl: './trip-planner.component.html',
  styleUrl: './trip-planner.component.scss'
})
export class TripPlannerComponent implements OnInit {

  private destinationService = inject(DestinationsService);
  days:number = 1;
  myControl = new FormControl<string | Destination>('');
  options: Destination[] = [];
  filteredOptions!: Observable<Destination[] | null>;
  selectedDestination: Destination | null = null;
  todayDate = new Date();
 
  form = new FormGroup({
    destination: new FormControl(''),
    date: new FormControl(),
    days: new FormControl(),
    low: new FormControl(),
    medium: new FormControl(),
    high: new FormControl(),
    solo: new FormControl(),
    couple: new FormControl(),
    family: new FormControl(),
    friends: new FormControl(),
    beach: new FormControl(),
    city: new FormControl(),
    outdoor: new FormControl(),
    events: new FormControl(),
    food: new FormControl(),
    nightlife: new FormControl(),
    shopping: new FormControl(),
    wellness: new FormControl()
  });

  ngOnInit() {
    this.destinationService.getDestinationsByRegion().subscribe({
      next: (result) => {
        this.options = result;
      },
      error: (err) => {
        console.error("Error fetching destinations:", err);
      }
    });
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.nameCommon;
        if (!name || name.length < 2) {
          return null; 
        }
        return this._filter(name);
      }),
    );
    
    this.myControl.valueChanges
    .pipe(debounceTime(200), distinctUntilChanged())
    .subscribe(val => {
      if (typeof val === 'string') {
        this.selectedDestination = null;
      }
    });
  }

  submitForm() {
    console.log(this.form.value);
  }

  increaseOrDecreaseDays(action: string){
    if(action=='decrease' && this.days != 1)
      this.days--;
    if(action =='increase')
      this.days++;

    this.form.controls['days'].setValue(this.days);
  }

  onBudgetChange(selected: 'low' | 'medium' | 'high') {
    this.form.patchValue({
      low: selected === 'low',
      medium: selected === 'medium',
      high: selected === 'high'
    });
  }

  onPartnersChange(selected: 'solo' | 'couple' | 'family'| 'friends') {
    this.form.patchValue({
      solo: selected === 'solo',
      couple: selected === 'couple',
      family: selected === 'family',
      friends: selected === 'friends'
    });
  }

  
  onOptionSelected(option: Destination) {
    this.selectedDestination = option;
  }
  
  displayFn(destination: Destination): string {
    return destination.flag && destination.nameCommon;
  }

  private _filter(name: string): Destination[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.nameCommon.toLowerCase().includes(filterValue));
  }
  
}
