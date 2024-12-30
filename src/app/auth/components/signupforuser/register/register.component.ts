import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SharedModule } from '../../../../shared/shared/shared.module';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule, RouterLink, SharedModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  hidePassword: boolean = true;

  constructor(private httpclient: HttpClient, private router: Router, private fb: FormBuilder) { 
    this.customer = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]], // assuming phone number should be 10 digits
      address: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      
    });
  }

  customer: FormGroup;

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

 /* checkPasswords(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { notSame: true };
  }*/

  handleSubmit() {
    const url = 'http://localhost:8080/customer/insert';
  console.log(this.customer.value);
  console.log('Customer data being sent:', this.customer.value);
  console.log('Customer data being sent:', JSON.stringify(this.customer.value, null, 2));


  this.httpclient.post(url, this.customer.value).subscribe(
    (response: any) => {
      console.log(response);
      if (response) {
        console.log('Customer added successfully, navigating to login page');
        this.router.navigateByUrl('/userlogin');
      } else {
        console.error('Failed to add customer:', response);
        alert('Failed to add customer. Please try again.');
      }
    },
    
  );
}

  reloadPage(): void {
    window.location.reload();
  }
}
