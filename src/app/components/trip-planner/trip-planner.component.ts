import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { DestinationsService } from '../../shared/services/destinations.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { debounceTime, distinctUntilChanged, map, Observable, startWith } from 'rxjs';
import { Destination } from '../../models/destinations';
import { AsyncPipe } from '@angular/common';
import { ActivityService } from '../../shared/services/activity.service';
import { Activity } from '../../models/activities';
import { VacationService } from '../../shared/services/vacation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trip-planner',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    MatChipsModule,
    MatCheckboxModule,
    MatButtonModule,
    MatAutocompleteModule,
    AsyncPipe
  ],
  templateUrl: './trip-planner.component.html',
  styleUrl: './trip-planner.component.scss'
})
export class TripPlannerComponent implements OnInit {

  private destinationService = inject(DestinationsService);
  private activityService = inject(ActivityService);
  private vacationService = inject(VacationService);
   private router = inject(Router);

  days: number = 1;
  options: Destination[] = [];
  activities: Activity[] = [];
  filteredOptions!: Observable<Destination[] | null>;
  selectedDestination: Destination | null = null;
  todayDate = new Date();

  form = new FormGroup({
    destination: new FormControl<string | Destination>(''),
    date: new FormControl(),
    days: new FormControl(),
    low: new FormControl(),
    medium: new FormControl(),
    high: new FormControl(),
    solo: new FormControl(),
    couple: new FormControl(),
    family: new FormControl(),
    friends: new FormControl(),
    beaches: new FormControl(),
    citysightseeing: new FormControl(),
    outdooradventures: new FormControl(),
    festivals: new FormControl(),
    foodexploration: new FormControl(),
    nightlife: new FormControl(),
    shopping: new FormControl(),
    spawellness: new FormControl()
  });

  ngOnInit() {
    this.loadActivities();
    this.destinationService.getDestinationsByRegion().subscribe({
      next: (result) => {
        this.options = result;
      },
      error: (err) => {
        console.error("Error fetching destinations:", err);
      }
    });

    this.filteredOptions = this.form.get("destination")!.valueChanges.pipe(
      startWith(''),
      debounceTime(200),
      distinctUntilChanged(),
      map(value => {
        const name = typeof value === 'string' ? value : value?.nameCommon;
        if (!name || name.length < 2) {
          return null;
        }
        return this._filter(name);
      })
    );

    this.form.get("destination")!.valueChanges
      .pipe(debounceTime(200), distinctUntilChanged())
      .subscribe(val => {
        if (typeof val === 'string') {
          this.selectedDestination = null;
        }
      });
  }

  submitForm() {
    const startingDate = this.form.get("date")?.value;
    const numberOfDays = this.days;
  
    const endingDateObj = new Date(startingDate);
    endingDateObj.setDate(endingDateObj.getDate() + numberOfDays);
  
    let travelCompanion: string | null = null;
    if (this.form.get("solo")?.value) travelCompanion = "SOLO";
    if (this.form.get("couple")?.value) travelCompanion = "COUPLE";
    if (this.form.get("family")?.value) travelCompanion = "FAMILY";
    if (this.form.get("friends")?.value) travelCompanion = "FRIENDS";


    let budget: number;
    if (this.form.get("low")?.value) {
      budget = 1000;
    } else if (this.form.get("medium")?.value) {
      budget = 2000;
    } else {
      budget = 3000;
    }
  

    const activityList:Activity[] = [];
  
    this.activities.forEach(activity => {
      if (this.form.get(this.normalizeNames(activity.activityType))?.value) {
        activityList.push(activity);
      }
    });

    const destination = this.form.get("destination")?.value;
    let country: string | undefined;
    if (typeof destination === "string") {
      country = destination;
    } else if (destination && destination.nameCommon) {
      country = destination.nameCommon;
    }
  
    const requestBody = {
      budget,
      country,
      days: numberOfDays,
      startingDate: this.formatDate(startingDate),
      endingDate: this.formatDate(endingDateObj),
      travelCompanion,
      activityList
    };
  
    this.vacationService.create(requestBody).subscribe({
     next: (result) => {
      this.router.navigate(['/trip', result.id]);
     },
     error: (err)=>{
      console.log(err);
     }
    })
}

  
  loadActivities(): void {
    this.activityService.getActivities().subscribe({
      next: (data) => {
        this.activities = data; 
      },
      error: (err) => {
        console.error('Eroare la încărcarea activităților:', err);
      }
    });
  }

  increaseOrDecreaseDays(action: string) {
    if (action == 'decrease' && this.days != 1)
      this.days--;
    if (action == 'increase')
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

  onPartnersChange(selected: 'solo' | 'couple' | 'family' | 'friends') {
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
    return destination?.nameCommon ?? '';
  }

  private _filter(name: string): Destination[] {
    const filterValue = name.toLowerCase();
    return this.options.filter(option =>
      option.nameCommon.toLowerCase().includes(filterValue)
    );
  }

  formatDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };
  
  normalizeNames(name: string): string {
    return name
      .toLowerCase()           
      .replace(/\s+/g, '')      
      .replace(/%20/g, '');      
  }
  
  
  
}
