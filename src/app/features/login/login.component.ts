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
import { ChangeDetectorRef } from '@angular/core';




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
  private cookiesService = inject(CookiesService);
  private cdr = inject(ChangeDetectorRef);
  loginResponse: string | null = null;


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
        this.loginResponse = null;
        this.cdr.detectChanges();
        if(response.token !== null){
          this.cookiesService.setCookie("auth_token",response.token);
          this.dialogRef.close();
        }else{
          this.cookiesService.deleteCookie("auth_token");
        }
        
      },
      error:(error)=>{
        console.log("There was an error"+ error);
        this.loginResponse = 'The username or password is incorrect!';
        this.cdr.detectChanges();
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
        if(response.token !== null){
          this.cookiesService.setCookie("auth_token",response.token);
        }else{
          this.cookiesService.deleteCookie("auth_token");
        }
      },
      error:(error)=>{
        console.log("There was an error"+ error);
      }
    })


  }

}
