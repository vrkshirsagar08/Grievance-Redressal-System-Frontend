import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { SharedModule } from '../../../../shared/shared/shared.module';
import { FormBuilder, FormGroup } from '@angular/forms';
import { title } from 'process';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-dashboard',
  imports: [SharedModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {


  listOfTasks :any=[];
  searchTaskForm! : FormGroup;

  constructor(private service:AdminService,
    private fb : FormBuilder,
    private snackbar : MatSnackBar
  ){}

  ngOnInit(){
    this.getTasks();
    this.searchTaskForm = this.fb.group({
      title:[null]
    })
  }

  getTasks(){
    this.service.getTasks().subscribe((res)=>{
      console.log(res);
      this.listOfTasks = res;
    })
  }

  submitForm(){
    // console.log(this.searchTaskForm.value)

    const title = this.searchTaskForm.get('title')!.value;
    this.listOfTasks = [];
    this.service.searchTask(title).subscribe((res)=>{
      this.listOfTasks = res
    })
  }

  deleteTask(id:number){
    this.service.deleteTask(id).subscribe((res)=>{
      this.getTasks();
      this.snackbar.open('Task deleted successfully', "close", {duration : 5000})
    })
  }
}
