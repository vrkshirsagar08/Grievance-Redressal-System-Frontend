import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeDashboardComponent } from './components/employee-dashboard/employee-dashboard.component';
import { provideRouter, Routes } from '@angular/router';
import { ViewTaskDetailsComponent } from './components/view-task-details/view-task-details.component';

const routes: Routes =[
  {path:"dashboard",component : EmployeeDashboardComponent},
  {path:"task/:id/view",component : ViewTaskDetailsComponent}
]   


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers:[
    provideRouter(routes)
  ]
})
export class EmployeeModule { }
