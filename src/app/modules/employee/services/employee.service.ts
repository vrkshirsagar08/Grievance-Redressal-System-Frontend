import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from '../../../auth/services/storage/storage.service';


const BASE_URL = "http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }


  getTaskbyId(id: number):Observable<any>{
    return this.http.get(`${BASE_URL}api/employee/task/${id}`,{
      headers:this.createAuthorizationHeader()
    });
  }

  /*getTaskbyUserId(id: number):Observable<any>{
    return this.http.get(`${BASE_URL}api/employee/tasks/${StorageService.getUserId()}`,{
      headers:this.createAuthorizationHeader()
    });
  }*/
    getTaskbyUserId(id: number): Observable<any> {
      const userId = StorageService.getUserId(); // Get the user ID from the service
      return this.http.get(`${BASE_URL}api/employee/tasks/${userId}`, {
        headers: this.createAuthorizationHeader()
      });
    }
  
  getCommentsByTaskId(id: number):Observable<any>{
      return this.http.get(`${BASE_URL}api/employee/task/${id}/comments`,{
      headers:this.createAuthorizationHeader()
    });
  }
  
  createComment(taskId: number,content: string):Observable<any>{
      const params = {taskId:taskId,
        postedBy : StorageService.getUserId()
      }
      return this.http.post(`${BASE_URL}api/employee/task/comment` , content,{
        params: params,
        headers:this.createAuthorizationHeader()
      });
  }

  updateTask(id: number,status:string):Observable<any>{
    return this.http.put(`${BASE_URL}api/employee/task/${id}/${status}`,{
      headers:this.createAuthorizationHeader()
    });
  }
  
  private createAuthorizationHeader(): HttpHeaders {
      return new HttpHeaders().set("Authorization", "Bearer " + StorageService.getToken());
  }
}
