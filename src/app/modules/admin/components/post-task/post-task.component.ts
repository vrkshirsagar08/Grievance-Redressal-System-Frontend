import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { SharedModule } from '../../../../shared/shared/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-post-task',
  imports: [SharedModule],
  templateUrl: './post-task.component.html',
  styleUrl: './post-task.component.scss'
})
export class PostTaskComponent {

  postTaskForm! : FormGroup;

  listOfEmployees:any=[];
  listOfPriorities: any =["LOW","MEDIUM","HIGH"];
  constructor(private service: AdminService,
    private fb : FormBuilder,
    private router : Router,
    private snackbar : MatSnackBar
  ){

  }
  ngOnInit(){
    this.postTaskForm = this.fb.group({
      employeeId:[null,[Validators.required]],
      title:[null,[Validators.required]],
      dueDate:[null,[Validators.required]],
      description:[null,[Validators.required]],
      priority:[null,[Validators.required]]
    });
    this.getUsers();
  }
  getUsers(){
    this.service.getUsers().subscribe((res)=>{
      this.listOfEmployees = res;
    })
  }

  postTask(){
    console.log(this.postTaskForm.value);
    this.service.postTask(this.postTaskForm.value).subscribe((res)=>{
      console.log(res);
      if(res.id != null){
        this.router.navigateByUrl("/admin/dashboard");
        this.snackbar.open("Task assign successfully",'close',{duration:5000})
      } else{
        this.snackbar.open("Something went wrong",'error',{duration:5000})
      }
    })
  }
}
