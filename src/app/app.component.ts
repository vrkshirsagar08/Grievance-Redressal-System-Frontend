import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SharedModule } from './shared/shared/shared.module';
import { HomeComponent } from "./auth/components/home/home.component";
import { StorageService } from './auth/services/storage/storage.service';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SharedModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppComponent {
  title = 'frontend';

  isAdminLoggedIn:boolean =StorageService.isAdminLoggedIn();
  isEmployeeLoggedIn:boolean =StorageService.isEmployeeLoggedIn();
  isUserLoggedIn:boolean =StorageService.isUserLoggedIn();

  constructor(private router : Router)
  {}

  ngOnInit(){
    this.router.events.subscribe(event =>{
      this.isAdminLoggedIn = StorageService.isAdminLoggedIn();
      this.isEmployeeLoggedIn = StorageService.isEmployeeLoggedIn();
      this.isUserLoggedIn = StorageService.isUserLoggedIn();
    })
  }

  logout(){
    StorageService.signout();
    this.router.navigateByUrl("/login");
  }
}
