import { Component } from '@angular/core';
import { SharedModule } from '../../../../shared/shared/shared.module';
import { EmployeeService } from '../../services/employee.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-task-details',
  imports: [SharedModule],
  templateUrl: './view-task-details.component.html',
  styleUrl: './view-task-details.component.scss'
})
export class ViewTaskDetailsComponent {

   
    id!: number; 
    commentForm! : FormGroup;
    taskData:any;
    comments:any;
  
  
    constructor(private service: EmployeeService,
      private fb : FormBuilder,
      private router : Router,
      private snackbar : MatSnackBar,
      private activatedRoute :ActivatedRoute
    ){}
  
  
  
  ngOnInit(){
      this.id = this.activatedRoute.snapshot.params['id'];
      this.commentForm = this.fb.group({
        content:[null,[Validators.required]],
      });
      this.getTaskById();
    }
    getTaskById(){
      this.service.getTaskbyId(this.id).subscribe((res)=>{
        console.log(res);
        this.taskData = res;
        this.getCommentsTaskId()
      })
    }

    getCommentsTaskId(){
      this.service.getCommentsByTaskId(this.id).subscribe((res)=>{
        console.log(res);
        this.comments = res;
      })
    }



   publishComment(){
    this.service.createComment(this.id , this.commentForm.get('content')?.value).subscribe((res)=>{
      console.log(res);
      if(res.id != null){
        this.snackbar.open("Comments publish successfully",'close',{duration:5000})
        this.getCommentsTaskId();
      } else{
        this.snackbar.open("Something went wrong",'error',{duration:5000})
      }
    })
   } 

}
