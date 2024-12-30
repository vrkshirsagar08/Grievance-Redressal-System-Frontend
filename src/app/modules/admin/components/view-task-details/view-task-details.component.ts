import { Component } from '@angular/core';
import { SharedModule } from '../../../../shared/shared/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
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
  
  
    constructor(private service: AdminService,
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
      this.service.getTasksbyId(this.id).subscribe((res)=>{
        console.log(res);
        this.taskData = res;
        this.getCommentsTaskId()
      })
    }

    getCommentsTaskId(){
      this.service.getCommentsByTask(this.id).subscribe((res)=>{
        console.log(res);
        this.comments = res;
      })
    }



    publishComment() {
      const content = this.commentForm.get('content')?.value;
    
      this.service.createComment(this.id, content).subscribe({
        next: (res) => {
          console.log(res);
          this.snackbar.open("Comment published successfully", 'close', { duration: 5000 });
          this.getCommentsTaskId(); // Refresh comments
        },
        error: (err) => {
          console.error(err);
          this.snackbar.open("Something went wrong", 'close', { duration: 5000 });
        },
      });
    }
  }    
