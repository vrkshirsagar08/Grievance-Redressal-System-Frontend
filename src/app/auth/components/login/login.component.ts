import { Component, inject, NgModule } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { SharedModule } from '../../../shared/shared/shared.module';
import { AuthService } from '../../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StorageService } from '../../services/storage/storage.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [SharedModule,HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm!: FormGroup;
  hidePassword: boolean = true;

  togglePasswordVisibility(){
    this.hidePassword = !this.hidePassword;
  }

  constructor(private fb:FormBuilder,
    private service : AuthService,
    private snackbar : MatSnackBar,
    private router: Router
  ){}

  ngOnInit(){
      this.loginForm= this.fb.group({
      email:[null,[Validators.required,Validators.email]],
      password:[null,[Validators.required]],
    });
  }

  login(){
    console.log(this.loginForm.value);
    this.service.login(this.loginForm.value).subscribe((res)=>{
      console.log(res);
      if(res.userId != null){
        const user ={
          id: res.userId,
          role: res.userRole
        }
        StorageService.saveUser(user);
        StorageService.saveToken(res.jwt);
        
  
        if(StorageService.isAdminLoggedIn()){
          console.log("login successfull");
          this.router.navigateByUrl("/admin/dashboard");
          // this.router.navigate(['/dashboard'])
        }
        
        else if (StorageService.isEmployeeLoggedIn()){
          this.router.navigateByUrl("/employee/dashboard");
        } 
        else {
          this.snackbar.open("Invalid Credentials", "Close", {
            duration: 5000,
            panelClass: 'error-snackbar',
          })
        }
        
      } else{
        this.snackbar.open("Invalid Credentials", "Close", {duration: 5000 , panelClass:'error-snackbar'})
      }
    });
  }
}
