import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { SharedModule } from '../../../../shared/shared/shared.module';

@Component({
  selector: 'app-show-complaints',
  imports: [SharedModule],
  templateUrl: './show-complaints.component.html',
  styleUrl: './show-complaints.component.scss'
})
export class ShowComplaintsComponent {

  constructor(private httpClient: HttpClient) {}

  complaints: any[] = [];

  ngOnInit(): void {
    this.getComplaints();

}
getComplaints() {
  const baseURL = "http://localhost:8080/complaint/show";
  this.httpClient.get(baseURL).subscribe((response:any)=>{
    console.log(response);
    this.complaints = response;
  }, error => {
    console.log("some error is comming" + error);
  })

}
}
