import { Component } from '@angular/core';
import { SharedModule } from '../../../../shared/shared/shared.module';
import { EmployeeService } from '../../services/employee.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-employee-dashboard',
  imports: [SharedModule],
  templateUrl: './employee-dashboard.component.html',
  styleUrl: './employee-dashboard.component.scss'
})
export class EmployeeDashboardComponent {

  listOfTasks :any=[];
  id! : number;

  constructor(private service : EmployeeService,
    private snackbar : MatSnackBar
  ){}

  ngOnInit(){
    this.getTasks()
  }

  getTasks(){
    this.service.getTaskbyUserId(this.id).subscribe((res)=>{
      console.log(res);
      this.listOfTasks = res;
    })
  }

  updateStatus(id:number,status:string){
    this.service.updateTask(id,status).subscribe((res)=>{
      if(res.id != null){
        this.snackbar.open("Task updated successfully", "close" , {duration:5000});
        this.getTasks();
      }
      else{
        this.snackbar.open("Someting went Wrong", "close" , {duration:5000});
      }
    })
  }
}
