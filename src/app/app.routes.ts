import { Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { SignupComponent } from './auth/components/signup/signup.component';
import { HomeComponent } from './auth/components/home/home.component';
import { AboutusComponent } from './auth/components/aboutus/aboutus.component';
import { ContactusComponent } from './auth/components/contactus/contactus.component';
import { AdminDashboardComponent } from './modules/admin/components/admin-dashboard/admin-dashboard.component';
import { RegisterComponent } from './auth/components/signupforuser/register/register.component';
import { LoginuserComponent } from './auth/components/loginforuser/loginuser/loginuser.component';
import { UserdashboardComponent } from './modules/User/userdashboard/userdashboard.component';
import { UsernavbarComponent } from './modules/User/usernavbar/usernavbar.component';


export const routes: Routes = [
    {path:'',component : HomeComponent},
    {path:'aboutus',component : AboutusComponent},
    {path:'contactus',component : ContactusComponent},
    {path:'login',component : LoginComponent},
    {path:'dashboard',component : AdminDashboardComponent},
    {path:'register',component : SignupComponent},
    // {path:'registeruser',component : RegisterComponent},
    // {path:'userlogin',component : LoginuserComponent},
    {path:'userdashboard',component :UserdashboardComponent},
    // {path:'usernavbar',component :UsernavbarComponent},
    {path:"admin", loadChildren:()=>import("./modules/admin/admin.module").then(e=>e.AdminModule)},
    {path:"employee", loadChildren:()=>import("./modules/employee/employee.module").then(e=>e.EmployeeModule)}
];
