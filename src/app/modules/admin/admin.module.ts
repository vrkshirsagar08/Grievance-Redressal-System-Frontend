import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideRouter, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { PostTaskComponent } from './components/post-task/post-task.component';
import { UpdateTaskComponent } from './components/update-task/update-task.component';
import { ViewTaskDetailsComponent } from './components/view-task-details/view-task-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { ShowComplaintsComponent } from './components/show-complaints/show-complaints.component';

const routes: Routes =[
  {path: "dashboard",component: AdminDashboardComponent},
  {path: "task/post",component: PostTaskComponent},
  {path: "task/:id/edit",component: UpdateTaskComponent},
  {path: "task/:id/view",component: ViewTaskDetailsComponent},
  {path: "show",component: ShowComplaintsComponent},


]   

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  providers:[provideRouter(routes)]
})
export class AdminModule { }
