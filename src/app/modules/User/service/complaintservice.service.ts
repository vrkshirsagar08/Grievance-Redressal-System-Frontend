import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComplaintserviceService {

  private apiUrl = 'http://localhost:8080/complaint/create'; 
  constructor(private http: HttpClient) { } 
   submitComplaint(complaintData: any): Observable<any> 
   { 
    return this.http.post(this.apiUrl, complaintData); 
  }
}
