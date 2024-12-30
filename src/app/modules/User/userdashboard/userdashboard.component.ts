import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedModule } from '../../../shared/shared/shared.module';
import { ComplaintserviceService } from '../service/complaintservice.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-userdashboard',
  imports: [SharedModule],
  templateUrl: './userdashboard.component.html',
  styleUrl: './userdashboard.component.scss'
})
export class UserdashboardComponent {
  complaintForm: FormGroup; 
  constructor(private fb: FormBuilder,private complaintService: ComplaintserviceService, private snackbar : MatSnackBar) { 
    this.complaintForm = this.fb.group({ 
      name: ['', Validators.required], 
      email: ['', [Validators.required, Validators.email]], 
      address: ['', Validators.required],
       phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
        // assuming phone number should be 10 digits 
        complaintTitle: ['', Validators.required],
         description: ['', Validators.required] 
        }); 
        }
      
        
        
        onSubmit() 
        { 
          if (this.complaintForm.valid) {
             console.log(this.complaintForm.value);
              this.complaintService.submitComplaint(this.complaintForm.value) .subscribe(response => {
                this.snackbar.open("Complaint Submitted Successfully", "Close", {duration: 9000 , panelClass:'error-snackbar'})

                 console.log('Complaint submitted successfully', response); 
                }, 
                error => {
                   console.log('Error submitting complaint', error); 

                  }); 
                }
          }
}

