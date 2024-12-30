import { Component, CUSTOM_ELEMENTS_SCHEMA, InjectionToken } from '@angular/core';
import { SharedModule } from '../../../shared/shared/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { MatSnackBar } from "@angular/material/snack-bar"
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  imports: [SharedModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
  schemas:[
      CUSTOM_ELEMENTS_SCHEMA
    ]

})
export class SignupComponent {
  signupForm!: FormGroup;
  hidePassword: boolean = true;

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  constructor(private fb:FormBuilder,
    private service:AuthService,
    private snackbar : MatSnackBar,
    private router : Router
  ){}

  ngOnInit(){
    this.signupForm= this.fb.group({
      name:[null,[Validators.required]],
      email:[null,[Validators.required,Validators.email]],
      // mobileNumber:[null,[Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      password:[null,[Validators.required]],
      confirmPassword:[null,[Validators.required]],
    });
  }

  signup(){

    const password = this.signupForm.get("password")?.value;
    const confirmPassword = this.signupForm.get("confirmPassword")?.value;

    if(password !== confirmPassword){
      this.snackbar.open("password do not match!", "Close", {duration: 5000, panelClass:'error-snackbar'});
      return;
    }

    console.log(this.signupForm.value);
    this.service.signup(this.signupForm.value).subscribe((res)=>{
      console.log(res);
      if(res.id != null) {
        this.snackbar.open("Signup successful", "Close", {duration: 5000});
        this.router.navigateByUrl("/login");
      } 
      else {
        this.snackbar.open("Signup failed", "Close", {duration: 5000 , panelClass:'error-snackbar'});
      }
    });
    
  }
}
