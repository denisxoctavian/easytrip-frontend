import { Component, inject, signal } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { UserService } from '../../shared/services/user.service';
import { Vacation } from '../../models/vacations';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-trips-history',
  imports: [MatCardModule,MatChipsModule, MatButtonModule,MatIconModule,NgxSpinnerModule],
  templateUrl: './trips-history.component.html',
  styleUrl: './trips-history.component.scss'
})
export class TripsHistoryComponent {
  private userService = inject(UserService);
  private router = inject(Router);
  private spinnerService = inject(NgxSpinnerService);
  readonly dialog = inject(MatDialog);
  vacations: Vacation[]= [];
  

  ngOnInit(){
    this.getUserVacations();
  }

  getUserVacations(){
    this.spinnerService.show();
    this.userService.getVacations().subscribe({
      next: (result:any)=>{
        console.log(result);
        this.vacations = result;
      },
      error:(err:any)=>{
        console.log(err);
        this.vacations = [];
      },
      complete:()=>{
        setTimeout(() => {
          this.spinnerService.hide();
        }, 1000);
      }
    })
  }

  onCardClick(vacation: any) {
    this.router.navigate(['/trip', vacation.id]);
  }

  onDeleteClick(vacation:any){
      const dialogRef = this.dialog.open(ConfirmDialogComponent, { 
        width: '400px',
        height: '300px',
        panelClass: ['animate__animated', 'animate__fadeInDown'],
        data: vacation
      });
    
      dialogRef.afterClosed().subscribe(result => {
        this.getUserVacations();
      });
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
