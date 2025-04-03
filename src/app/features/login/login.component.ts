import { ChangeDetectionStrategy, Component, Inject, inject, signal } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../shared/services/auth.service';
import { CookiesService } from '../../shared/services/cookies.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';




@Component({
  selector: 'app-login',
  imports: [MatButtonModule, MatDialogTitle, MatDialogContent, MatIconModule,MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  readonly dialogRef = inject(MatDialogRef<LoginComponent>);


  loginEmail = signal("");
  loginPassword = signal("");

  signupEmail = signal("");
  signupFullName = signal("");
  signupPassword = signal("");
  signupConfirmPassword = signal("");
  hidePassword = signal(true);

  login:boolean =true;
  signup:boolean =false;

  switchForms() {
    this.login = !this.login;
    this.signup = !this.signup;
  }
  

  signInUser(){
    console.log(this.loginEmail())
    console.log(this.loginPassword())
  }

  signUpUser(){

  }

}
