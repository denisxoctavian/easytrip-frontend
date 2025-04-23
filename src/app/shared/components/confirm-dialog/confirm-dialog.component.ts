import { Component, inject, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { VacationService } from '../../services/vacation.service';


@Component({
  selector: 'app-confirm-dialog',
  imports: [MatButtonModule,MatDialogContent,MatDialogActions],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss'
})
export class ConfirmDialogComponent {
  
  private vacationService = inject(VacationService);

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private dialogRef: MatDialogRef<ConfirmDialogComponent>) {
    console.log('Vacation data received in dialog:', this.data);
  }


  clickYes(){
    this.vacationService.delete(this.data.id).subscribe({
      next: ()=>{
        this.dialogRef.close(true);
      }
    })
  }

  clickNo(){
    this.dialogRef.close(true);
  }
}
