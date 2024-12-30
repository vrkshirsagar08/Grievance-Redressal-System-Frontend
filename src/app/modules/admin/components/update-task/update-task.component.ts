import { Component } from '@angular/core';
import { SharedModule } from '../../../../shared/shared/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-update-task',
  imports: [SharedModule],
  templateUrl: './update-task.component.html',
  styleUrl: './update-task.component.scss'
})
export class UpdateTaskComponent {

  
  id!: number; 
  updateTaskForm! : FormGroup;

  listOfEmployees:any=[];
  listOfPriorities: any =["LOW","MEDIUM","HIGH"];
  listOfTaskStatus:any=["PENDING","INPROGRESS","COMPLETED","DEFERRED","CANCELED"];

  constructor(private service: AdminService,
    private fb : FormBuilder,
    private router : Router,
    private snackbar : MatSnackBar,
    private activatedRoute :ActivatedRoute
  ){}



ngOnInit(){
      this.id = this.activatedRoute.snapshot.params['id'];
    this.updateTaskForm = this.fb.group({
      employeeId:[null,[Validators.required]],
      title:[null,[Validators.required]],
      dueDate:[null,[Validators.required]],
      description:[null,[Validators.required]],
      priority:[null,[Validators.required]],
      taskStatus:[null,[Validators.required]]
    });
    this.getTaskById();
  }
  getTaskById(){
    this.service.getTasksbyId(this.id).subscribe((res)=>{
      console.log(res);
      this.getUsers();
      this.updateTaskForm.patchValue(res);
     
    })
  }
  getUsers(){
    this.service.getUsers().subscribe((res)=>{
      console.log(res);
      this.listOfEmployees = res;
    })
  }

  updateTask(){
    this.service.updateTask(this.id,this.updateTaskForm.value).subscribe((res)=>{
      console.log(res);
      if(res.id != null){
        this.router.navigateByUrl("/admin/dashboard");
        this.snackbar.open("Task updated successfully",'close',{duration:5000});
      } else{
        this.snackbar.open("Something went wrong",'error',{duration:5000});
      }
    })
  }

}
