import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../../shared/services/user.service';
import { environment } from '../../../environments/environment.development';
import { AuthService } from '../../shared/services/auth.service';




@Component({
  selector: 'app-login',
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  readonly dialogRef = inject(MatDialogRef<LoginComponent>);
  private userService = inject(UserService);
  private authService = inject(AuthService);
  user: any = null;


  login(): void {
    this.authService.login();
  }
  
  logout(): void {
    this.authService.logout();
  }
  

  
}
