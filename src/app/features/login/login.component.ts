import { ChangeDetectionStrategy, Component, Inject, inject, signal, ViewChild } from '@angular/core';
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
import {AbstractControl, FormControl, FormsModule, NgForm, ReactiveFormsModule, ValidationErrors, Validators} from '@angular/forms';




@Component({
  selector: 'app-login',
  imports: [MatButtonModule, MatDialogTitle, MatDialogContent, MatIconModule,MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  @ViewChild('loginForm') public loginForm: NgForm | undefined;
  @ViewChild('registerForm') public registerForm: NgForm | undefined;

  readonly dialogRef = inject(MatDialogRef<LoginComponent>);
  private authService = inject(AuthService);
  loginResponse = '200';

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
    this.loginForm?.reset();
    this.registerForm?.reset();
  }
  
  
  signInUser(){

    const loginBody = {
      email: this.loginEmail(),
      password: this.loginPassword()
    };

    this.authService.login(loginBody).subscribe({
      next:(response)=>{
        console.log(response);
        this.loginResponse = response.status;
      },
      error:(error)=>{
        console.log("There was an error"+ error);
        this.loginResponse = error.status;
      }
    })

  }

  signUpUser(){

    const registerBody = {
      fullName:this.signupFullName(),
      email: this.signupEmail(),
      password: this.signupPassword()
    };

    this.authService.register(registerBody).subscribe({
      next:(response)=>{
        console.log(response);
      },
      error:(error)=>{
        console.log("There was an error"+ error);
      }
    })


  }

}
