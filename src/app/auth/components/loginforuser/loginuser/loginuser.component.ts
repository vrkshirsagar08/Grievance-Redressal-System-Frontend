import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared/shared.module';
@Component({
  selector: 'app-loginuser',
  imports: [ReactiveFormsModule, CommonModule, RouterLink,SharedModule],
  templateUrl: './loginuser.component.html',
  styleUrl: './loginuser.component.scss'
})
export class LoginuserComponent {
  baseurl = 'http://localhost:8080/customer/loginCustomer';
  User: any;

  constructor(private httpclient: HttpClient, private router: Router) {}

  public loginRequestUser: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  hidePassword: boolean = true;

  togglePasswordVisibility(){
    this.hidePassword = !this.hidePassword;
  }


  public handleSubmitUser() {
    console.log(this.loginRequestUser.value);
    this.httpclient.post(this.baseurl, this.loginRequestUser.value).subscribe(
      (response: any) => {


        console.log('Login successful:', response);

      console.log(response)

        if(response!=null){
          console.log("user");
          this.router.navigateByUrl('/usernavbar');
        }




      },
      (error) => {
        console.error('Error during login:', error);
        alert('Login failed. Please try again.');
      }
    );
  }


  

  getCurrentUser(): any {
    return this.User;
  }
}




  

  


  