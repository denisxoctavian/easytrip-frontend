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
  user: any = null;


  login() {
    const redirectUri = "https://easytrip-frontend.vercel.app";
    const authUrl = `${environment.API_PATH}/oauth2/authorization/github?redirect_uri=${encodeURIComponent(redirectUri)}`;
    console.log("Redirecting to:", authUrl);
    window.location.href = authUrl; 
  }
  
  
  

  
}
